package com.github.johannesthorbergsson.backend.bikes;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BikeServiceTest {
    BikeService bikeService;
    BikeRepository bikeRepository = mock(BikeRepository.class);
    Principal principal = mock(Principal.class);
    Component tyre = new Component("tyre", "Pirelli", 1337);
    Bike testBike = new Bike("1", "MegaBike9000", "steven", 1337, List.of(tyre));

    @BeforeEach
    void setUp(){
        bikeService = new BikeService(bikeRepository);
    }
    @Test
    void getAllBikes_whenBikesMatchPrincipal_thenReturnListOfBikes() {
        //GIVEN
        when(bikeRepository.findAll()).thenReturn(new ArrayList<>(List.of(testBike)));
        when(principal.getName()).thenReturn("steven");
        //WHEN
        List<Bike> actual = bikeService.getAllBikes(principal);
        List<Bike> expected = new ArrayList<>(List.of(testBike));
        //THEN
        verify(bikeRepository).findAll();
        verify(principal).getName();
        assertEquals(expected, actual);
    }
}