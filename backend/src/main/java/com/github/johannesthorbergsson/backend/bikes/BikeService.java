package com.github.johannesthorbergsson.backend.bikes;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BikeService {
    private final BikeRepository bikeRepository;

    public List<Bike> getAllBikes(){
        return bikeRepository.findAll();
    }
}
