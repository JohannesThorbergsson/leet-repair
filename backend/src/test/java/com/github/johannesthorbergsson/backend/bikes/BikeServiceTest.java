package com.github.johannesthorbergsson.backend.bikes;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BikeServiceTest {
    BikeService bikeService;
    BikeRepository bikeRepository = mock(BikeRepository.class);
    Component tyre = new Component("tyre", "Pirelli", 1337);
    Bike testBike = new Bike("1", "MegaBike9000", 1337, List.of(tyre));

    @BeforeEach
    void setUp(){
        bikeService = new BikeService(bikeRepository);
    }
    @Test
    void getAllBikes_whenBikesInRepo_thenReturnListOfBikes() {
        //GIVEN
        when(bikeRepository.findAll()).thenReturn(new ArrayList<>(List.of(testBike)));
        //WHEN
        List<Bike> actual = bikeService.getAllBikes();
        List<Bike> expected = new ArrayList<>(List.of(testBike));
        //THEN
        assertEquals(expected, actual);
    }
}