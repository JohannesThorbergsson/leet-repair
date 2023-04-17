package com.github.johannesthorbergsson.backend.workshops;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.johannesthorbergsson.backend.bikes.Component;
import com.github.johannesthorbergsson.backend.security.MongoUser;
import com.github.johannesthorbergsson.backend.security.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class WorkshopControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    WorkshopRepository workshopRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ObjectMapper mapper = new ObjectMapper();
    Component tyre = new Component("tyre", "Pirelli", 1337);
    Coordinates testCoordinates = new Coordinates(new BigDecimal("-33.8599358"), new BigDecimal("151.2090295"));
    Workshop workshop1 = new Workshop("1", "workshop42", "workshop42", "Kasinostraße, Darmstadt",
            testCoordinates, new ArrayList<>(List.of("tyre", "chain")), List.of(tyre));
    WorkshopRequest workshop1Request =
            new WorkshopRequest(workshop1.id(), workshop1.name(), workshop1.location(), workshop1.coordinates(),
                    workshop1.services(), workshop1.inventory());
    WorkshopResponse workshop1Response =
            new WorkshopResponse(workshop1.id(), workshop1.name(), workshop1.location(), workshop1.coordinates(),
                    workshop1.services(), workshop1.inventory());
    Workshop workshop2 = new Workshop("2", "workshop1337", "workshop1337", "Kasinostraße, Darmstadt",
            testCoordinates, new ArrayList<>(List.of("tyre", "brakes")), List.of(tyre));
    @Test
    @DirtiesContext
    @WithMockUser
    void getAllWorkshops_whenWorkshops_thenReturnJSONArray() throws Exception {
        //GIVEN
        workshopRepository.save(workshop1);
        workshopRepository.save(workshop2);
        //WHEN
        mockMvc.perform(get("/api/workshops/")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {
                            "id": "1",
                            "name": "workshop42",
                            "username": "workshop42",
                            "location": "Kasinostraße, Darmstadt",
                            "coordinates": {
                                "lat": -33.8599358,
                                "lng": 151.2090295
                            },
                            "services": ["tyre", "chain"],
                            "inventory": [
                                {
                                    "category": "tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ]
                        }, {
                            "id": "2",
                            "name": "workshop1337",
                            "username": "workshop1337",
                            "location": "Kasinostraße, Darmstadt",
                            "coordinates": {
                                "lat": -33.8599358,
                                "lng": 151.2090295
                            },
                            "services": ["tyre", "brakes"],
                            "inventory": [
                                {
                                    "category": "tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ]
                        }
                        ]
                        """)
                );
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "workshop42")
    void addWorkshop_whenWorkshopRequest_thenReturnWorkshop() throws Exception {
        //GIVEN
        String requestJSON = mapper.writeValueAsString(workshop1Request);
        //WHEN
        mockMvc.perform(post("/api/workshops/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                        {
                            "id": "1",
                            "name": "workshop42",
                            "username": "workshop42",
                            "location": "Kasinostraße, Darmstadt",
                            "coordinates": {
                                "lat": -33.8599358,
                                "lng": 151.2090295
                            },
                            "services": ["tyre", "chain"],
                            "inventory":
                            [
                                {
                                    "category": "tyre",
                                    "type": "Pirelli",
                                    "age": 1337
                                }
                            ]
                        }
                        """));
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "steven")
    void addWorkshop_whenBasicUser_thenStatus403() throws Exception {
        //GIVEN
        String requestJSON = mapper.writeValueAsString(workshop1Request);
        userRepository.save(new MongoUser("1", "steven", "1", "BASIC"));
        //WHEN
        mockMvc.perform(post("/api/workshops/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJSON)
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "workshop42")
    void updateWorkshop_whenValidRequest_thenReturnWorkshopResponse() throws Exception {
        //GIVEN
        workshopRepository.save(workshop1);
        String requestJSON = mapper.writeValueAsString(workshop1Request);
        String responseJSON = mapper.writeValueAsString(workshop1Response);
        //WHEN
        mockMvc.perform(put("/api/workshops/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJSON)
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(responseJSON));
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "h4xx()r")
    void updateWorkshop_whenUnauthorizedAccess_thenThrowUnauthorizedAccessException() throws Exception {
        //GIVEN
        workshopRepository.save(workshop1);
        String requestJSON = mapper.writeValueAsString(workshop1Request);
        //WHEN
        mockMvc.perform(put("/api/workshops/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJSON)
                .with(csrf()))
                .andExpect(status().isForbidden());
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "workshop42")
    void updateWorkshop_whenWorkshopNotFound_thenThrowNoSuchWorkshopException() throws Exception {
        String requestJSON = mapper.writeValueAsString(workshop1Request);
        //WHEN
        mockMvc.perform(put("/api/workshops/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJSON)
                .with(csrf()))
                .andExpect(status().isNotFound());
    }
}
