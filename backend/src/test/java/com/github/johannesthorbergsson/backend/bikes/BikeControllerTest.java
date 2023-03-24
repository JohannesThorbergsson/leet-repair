package com.github.johannesthorbergsson.backend.bikes;

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
class BikeControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    BikeRepository bikeRepository;
    Component tyre = new Component("tyre", "Pirelli", 1337);
    ServiceEvent tyreChange = new ServiceEvent("Tyre change", List.of(tyre), "Workshop 42",
            "2020" );
    Bike testBike = new Bike("1", "MegaBike9000", "steven", 1337, List.of(tyre), List.of(tyreChange));

    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void getAllBikes_whenBikes_thenReturnAllBikes() throws Exception {
        //GIVEN
        bikeRepository.save(testBike);
        //WHEN
        mockMvc.perform(get("/api/bikes/")
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
                                    "age": 1337
                                }
                            ],
                            "services": [
                                {
                                    "description": "Tyre change",
                                    "newComponents": [
                                        {
                                        "category": "tyre",
                                        "type": "Pirelli",
                                        "age": 1337
                                        }
                                    ],
                                    "workshopName": "Workshop 42",
                                    "date": "2020"
                                }
                            ]
                        }
                        ]
                        """));

    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void addBike_whenBikeRequest_thenReturnBike() throws Exception {
        mockMvc.perform(post("/api/bikes/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "modelName": "MegaBike9000",
                                "mileage": 1337,
                                "components": [
                                    {
                                        "category": "tyre",
                                        "type": "Pirelli",
                                        "age": 1337
                                    }
                                ],
                                "services": [
                                    {
                                        "description": "Tyre change",
                                        "newComponents": [
                                            {
                                            "category": "tyre",
                                            "type": "Pirelli",
                                            "age": 1337
                                            }
                                        ],
                                        "workshopName": "Workshop 42",
                                        "date": "2020"
                                    }
                                ]
                            }
                            """)
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                            "modelName": "MegaBike9000",
                            "ownerName": "steven",
                            "mileage": 1337,
                            "components": [
                                {
                                    "category": "tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ],
                            "services": [
                                {
                                    "description": "Tyre change",
                                    "newComponents": [
                                        {
                                        "category": "tyre",
                                        "type": "Pirelli",
                                        "age": 1337
                                        }
                                    ],
                                    "workshopName": "Workshop 42",
                                    "date": "2020"
                                }
                            ]
                    }
                    """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void updateBike_whenValidRequest_thenReturnUpdatedBike() throws Exception {
        bikeRepository.save(testBike);
        mockMvc.perform(put("/api/bikes/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "id": "1",
                                "modelName": "MegaBike9000",
                                "mileage": 1337,
                                "components": [
                                    {
                                        "category": "tyre",
                                        "type": "Pirelli",
                                        "age": 1337
                                    }
                                ],
                                "services": [
                                    {
                                        "description": "Tyre change",
                                        "newComponents": [
                                            {
                                            "category": "tyre",
                                            "type": "Pirelli",
                                            "age": 1337
                                            }
                                        ],
                                        "workshopName": "Workshop 42",
                                        "date": "2020"
                                    }
                                ]
                            }
                            """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "modelName": "MegaBike9000",
                        "ownerName": "steven",
                        "mileage": 1337,
                        "components": [
                            {
                                "category": "tyre",
                                "type": "Pirelli",
                                "age": 1337
                            }
                        ],
                        "services": [
                            {
                                "description": "Tyre change",
                                "newComponents": [
                                    {
                                    "category": "tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                    }
                                ],
                                "workshopName": "Workshop 42",
                                "date": "2020"
                            }
                        ]
                    }
                """));
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void updateBike_whenBikeNotFound_thenThrowBikeNotFoundException() throws Exception {
        bikeRepository.save(testBike);
        mockMvc.perform(put("/api/bikes/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "id": "5",
                                "modelName": "MegaBike9000",
                                "mileage": 1337,
                                "components": [
                                    {
                                        "category": "tyre",
                                        "type": "Pirelli",
                                        "age": 1337
                                    }
                                ],
                                "services": [
                                    {
                                        "description": "Tyre change",
                                        "newComponents": [
                                            {
                                            "category": "tyre",
                                            "type": "Pirelli",
                                            "age": 1337
                                            }
                                        ],
                                        "workshopName": "Workshop 42",
                                        "date": "2020"
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
    void updateBike_whenUnauthorizedAccess_thenThrowUnauthorizedAccessException() throws Exception {
        bikeRepository.save(testBike);
        mockMvc.perform(put("/api/bikes/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "id": "1",
                                "modelName": "MegaBike9000",
                                "mileage": 1337,
                                "components": [
                                    {
                                        "category": "tyre",
                                        "type": "Pirelli",
                                        "age": 1337
                                    }
                                ],
                                "services": [
                                    {
                                        "description": "Tyre change",
                                        "newComponents": [
                                            {
                                            "category": "tyre",
                                            "type": "Pirelli",
                                            "age": 1337
                                            }
                                        ],
                                        "workshopName": "Workshop 42",
                                        "date": "2020"
                                    }
                                ]
                            }
                            """)
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }
}
