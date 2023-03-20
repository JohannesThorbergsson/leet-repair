package com.github.johannesthorbergsson.backend.bikes;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BikeService {
    private final BikeRepository bikeRepository;

    public List<Bike> getAllBikes(Principal principal){
        return bikeRepository.findAll().stream().filter(bike -> bike.ownerName().equals(principal.getName())).toList();
    }
}
