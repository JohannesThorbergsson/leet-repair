package com.github.johannesthorbergsson.backend.bikes;

import com.github.johannesthorbergsson.backend.exceptions.NoSuchBikeException;
import com.github.johannesthorbergsson.backend.exceptions.UnauthorizedAccessException;
import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BikeService {
    private final BikeRepository bikeRepository;
    private final IdService idService;

    public List<Bike> getAllBikes(Principal principal){
        return bikeRepository.findBikeByOwnerName(principal.getName());
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
    public Bike updateBike (String id, BikeRequest bikeRequest, Principal principal){
        if (!bikeRepository.findById(id).orElseThrow(NoSuchBikeException:: new).ownerName().equals(principal.getName())) {
            throw new UnauthorizedAccessException();
        }
        Bike editedBike = new Bike(
                id,
                bikeRequest.modelName(),
                principal.getName(),
                bikeRequest.mileage(),
                bikeRequest.components(),
                bikeRequest.services());
        return bikeRepository.save(editedBike);
    }
    public Bike deleteBike(String id, Principal principal) {
        Optional<Bike> bikeToDeleteOptional = bikeRepository.findById(id);
        Bike bikeToDelete = bikeToDeleteOptional.orElseThrow(NoSuchBikeException::new);
        if (!bikeToDelete.ownerName().equals(principal.getName())) {
            throw new UnauthorizedAccessException();
        }
        bikeRepository.deleteById(id);
        return bikeToDelete;
    }
}
