package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WorkshopServiceTest {
    WorkshopService workshopService;
    WorkshopRepository workshopRepository = mock(WorkshopRepository.class);
    Component tyre = new Component("tyre", "Pirelli", 1337);
    Workshop workshop1 = new Workshop("1", "workshop42", "workshop42",
            new ArrayList<>(List.of("tyre", "chain")), List.of(tyre));

    Workshop workshop2 = new Workshop("1", "workshop1337", "workshop1337",
            new ArrayList<>(List.of("tyre", "brakes")), List.of(tyre));
    List<Workshop> expected = new ArrayList<>(List.of(workshop1, workshop2));

    @BeforeEach
    void setUp (){
        workshopService = new WorkshopService(workshopRepository);
    }

    @Test
    void getAllWorkshops_whenGetAll_thenReturnListWithWorkshops() {
        //GIVEN
        when(workshopRepository.findAll()).thenReturn(new ArrayList<>(List.of(workshop1, workshop2)));
        //WHEN
        List<Workshop> actual = workshopService.getAllWorkshops();
        //THEN
        assertEquals(expected, actual);
    }

}
