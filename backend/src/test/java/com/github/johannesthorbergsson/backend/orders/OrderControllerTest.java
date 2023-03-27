package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    OrderRepository orderRepository;
    List<Component> componentList = List.of(new Component("Tyre", "Pirelli", 1337));
    ServiceOrder testOrder = new ServiceOrder("1", "bid", "New Tyre", "steven", Status.OPEN, componentList);
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
}
