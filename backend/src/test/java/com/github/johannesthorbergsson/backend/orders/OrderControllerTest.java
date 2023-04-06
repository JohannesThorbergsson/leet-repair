package com.github.johannesthorbergsson.backend.orders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.github.johannesthorbergsson.backend.bikes.Component;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
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
    ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule()).setDateFormat(new StdDateFormat());
    List<Component> componentList = List.of(new Component("Tyre", "Pirelli", 1337));
    ServiceOrder testOrder = new ServiceOrder("1", "bid", "Amazing Bike","New Tyre", "Workshop42",
            "1", "steven", Status.OPEN, LocalDate.of(2022, 2, 1), componentList);
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
                            "bikeName": "Amazing Bike",
                            "description": "New Tyre",
                            "workshop": "Workshop42",
                            "workshopId": "1",
                            "username": "steven",
                            "status": "OPEN",
                            "date": "2022-02-01",
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
                            "bikeName": "Amazing Bike",
                            "description": "New Tyre",
                            "workshop": "Workshop42",
                            "workshopId": "1",
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
                            "bikeName": "Amazing Bike",
                            "description": "New Tyre",
                            "workshop": "Workshop42",                            
                            "workshopId": "1",
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
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.date").isNotEmpty());

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
                              "bikeName": "Amazing Bike",
                              "description": "New Tyre",
                              "workshop": "Workshop42",
                              "workshopId": "1",
                              "status": "OPEN",
                              "date": "2022-02-02",
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
                              "bikeName": "Amazing Bike",
                              "description": "New Tyre",
                              "workshop": "Workshop42",
                              "workshopId": "1",
                              "username": "steven",
                              "status": "OPEN",
                              "date": "2022-02-02",
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
                          "bikeName": "Amazing Bike",
                          "description": "New Tyre",
                          "workshop": "Workshop42",
                          "workshopId": "1",
                          "status": "OPEN",
                          "date": "2022-02-02",
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
                          "bikeName": "Amazing Bike",
                          "description": "New Tyre",
                          "workshop": "Workshop42",
                          "workshopId": "1",
                          "status": "OPEN",
                          "date": "2022-02-02",
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
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void deleteOrder_whenValidRequest_thenReturnDeletedOrder() throws Exception {
        orderRepository.save(testOrder);
        String requestJSON = mapper.writeValueAsString(testOrder);
        mockMvc.perform(delete("/api/orders/1")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(requestJSON));
    }
    @Test
    @WithMockUser(username = "steven")
    void deleteOrder_whenOrderNotFound_thenThrowNoSuchOrderException() throws Exception{
        mockMvc.perform(delete("/api/orders/1")
                .with(csrf()))
                .andExpect(status().isNotFound());
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "h4xx()r")
    void deleteOrder_whenUnauthorizedAccess_thenThrowUnauthorizedAccessException() throws Exception {
        orderRepository.save(testOrder);
        mockMvc.perform(delete("/api/orders/1")
                .with(csrf()))
                .andExpect(status().isForbidden());
    }
}
