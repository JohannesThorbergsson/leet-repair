package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    OrderRepository orderRepository;
    List<Component> componentList = List.of(new Component("Tyre", "Pirelli", 1337));
    ServiceOrder testOrder = new ServiceOrder("1", "bid", "New Tyre", "Workshop42", "steven", Status.OPEN, componentList);
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void getAllOrders_whenOrdersMatchPrincipal_thenReturnListOfOrders() throws Exception {
        //GIVEN
        orderRepository.save(testOrder);
        //WHEN
        mockMvc.perform(get("/api/orders/")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                            "id": "1",
                            "bikeId": "bid",
                            "description": "New Tyre",
                            "workshop": "Workshop42",
                            "username": "steven",
                            "status": "OPEN",
                            "componentsToReplace": [
                                {
                                    "category": "Tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ]
                            }
                        ]
                        """));

    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void addOrder_whenOrderRequest_thenReturnOrder() throws Exception {
        mockMvc.perform(post("/api/orders/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "bikeId": "bid",
                            "description": "New Tyre",
                            "workshop": "Workshop42",
                            "componentsToReplace": [
                                {
                                    "category": "Tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ]
                        }
                        """)
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                         {
                            "bikeId": "bid",
                            "description": "New Tyre",
                            "workshop": "Workshop42",
                            "username": "steven",
                            "status": "OPEN",
                            "componentsToReplace": [
                                {
                                    "category": "Tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ]
                         }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());

    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void updateOrder_whenValidRequest_thenReturnUpdatedOrder() throws Exception {
        orderRepository.save(testOrder);
        mockMvc.perform(put("/api/orders/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                          {
                              "bikeId": "bid",
                              "description": "New Tyre",
                              "workshop": "Workshop42",
                              "status": "OPEN",
                              "componentsToReplace": [
                                  {
                                      "category": "Tyre",
                                      "type": "Pirelli",
                                      "age": 1337
                                  }
                              ]
                         }
                    """)
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                          {
                              "id": "1",
                              "bikeId": "bid",
                              "description": "New Tyre",
                              "workshop": "Workshop42",
                              "username": "steven",
                              "status": "OPEN",
                              "componentsToReplace": [
                                  {
                                      "category": "Tyre",
                                      "type": "Pirelli",
                                      "age": 1337
                                  }
                              ]
                         }
                    """));
    }
    @Test
    @DirtiesContext
    @WithMockUser
    void updateOrder_whenOrderNotFound_thenThrowNoSuchOrderException() throws Exception {
        mockMvc.perform(put("/api/orders/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                          "bikeId": "bid",
                          "description": "New Tyre",
                          "workshop": "Workshop42",
                          "status": "OPEN",
                          "componentsToReplace": [
                              {
                                  "category": "Tyre",
                                  "type": "Pirelli",
                                  "age": 1337
                              }
                          ]
                     }
                    """)
                .with(csrf()))
                .andExpect(status().isNotFound());

    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "h4xx()r")
    void updateOrder_whenUnauthorizedAccess_thenThrowUnauthorizedAccessException() throws Exception {
        orderRepository.save(testOrder);
        mockMvc.perform(put("/api/orders/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                          "bikeId": "bid",
                          "description": "New Tyre",
                          "workshop": "Workshop42",
                          "status": "OPEN",
                          "componentsToReplace": [
                              {
                                  "category": "Tyre",
                                  "type": "Pirelli",
                                  "age": 1337
                              }
                          ]
                     }
                    """)
                .with(csrf()))
                .andExpect(status().isForbidden());
    }
}
