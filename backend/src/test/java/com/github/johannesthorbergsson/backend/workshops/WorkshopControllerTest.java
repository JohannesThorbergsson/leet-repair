package com.github.johannesthorbergsson.backend.workshops;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class WorkshopControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    WorkshopRepository workshopRepository;
    Workshop workshop1 = new Workshop("1", "workshop42", new ArrayList<>(List.of("tyre", "chain")));
    Workshop workshop2 = new Workshop("2", "workshop1337", new ArrayList<>(List.of("tyre", "brakes")));
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
                            "services": ["tyre", "chain"]
                        }, {
                            "id": "2",
                            "name": "workshop1337",
                            "services": ["tyre", "brakes"]
                        }
                        ]
                        """)
                        );
    }
}