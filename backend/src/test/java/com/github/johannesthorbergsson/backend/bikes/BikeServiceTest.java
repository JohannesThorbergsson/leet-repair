package com.github.johannesthorbergsson.backend.bikes;

import com.github.johannesthorbergsson.backend.id.IdService;
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
    IdService idService = mock(IdService.class);
    Principal principal = mock(Principal.class);
    Component tyre = new Component("tyre", "Pirelli", 1337);
    ServiceEvent tyreChange = new ServiceEvent("Tyre change", List.of(tyre), "Workshop 42",
            "2020" );
    Bike testBike = new Bike("1", "MegaBike9000", "steven", 1337, List.of(tyre), List.of(tyreChange));

    @BeforeEach
    void setUp(){
        bikeService = new BikeService(bikeRepository, idService);
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
    @Test
    void addBike_whenBikeRequest_thenSaveBikeToRepo(){
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(bikeRepository.save(testBike)).thenReturn(testBike);
        when(principal.getName()).thenReturn("steven");
        BikeRequest bikeRequest = new BikeRequest(testBike.modelName(), testBike.mileage(), testBike.components(), testBike.services());
        //WHEN
        Bike actual = bikeService.addBike(principal, bikeRequest);
        Bike expected = testBike;
        //THEN
        verify(idService).generateId();
        verify(bikeRepository).save(testBike);
        verify(principal).getName();
        assertEquals(expected, actual);
    }
}