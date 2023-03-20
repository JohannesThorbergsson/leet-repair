package com.github.johannesthorbergsson.backend.bikes;

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
class BikeControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    BikeRepository bikeRepository;
    Component tyre = new Component("tyre", "Pirelli", 1337);
    Bike testBike = new Bike("1", "MegaBike9000", "steven", 1337, List.of(tyre));

    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void getAllBikes_whenBikes_thenReturnAllBikes() throws Exception {
        //GIVEN
        bikeRepository.save(testBike);
        //WHEN
        mockMvc.perform(get("/api/bikes")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {
                            "id": "1",
                            "modelName": "MegaBike9000",
                            "ownerName": "steven",
                            "mileage": 1337,
                            "components": [
                                {
                                    "category": "tyre",
                                    "type": "Pirelli",
                                    "ageKm": 1337
                                }
                            ]
                        }
                        ]
                        """));

    }
}