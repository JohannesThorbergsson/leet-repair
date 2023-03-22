package com.github.johannesthorbergsson.backend.bikes;

import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BikeService {
    private final BikeRepository bikeRepository;
    private final IdService idService;

    public List<Bike> getAllBikes(Principal principal){
        return bikeRepository.findAll().stream().filter(bike -> bike.ownerName().equals(principal.getName())).toList();
    }
    public Bike addBike(Principal principal, BikeRequest bikeRequest) {
        Bike newBike = new Bike(
                idService.generateId(),
                bikeRequest.modelName(),
                principal.getName(),
                bikeRequest.mileage(),
                bikeRequest.components(),
                bikeRequest.services());
        return bikeRepository.save(newBike);
    }
}
