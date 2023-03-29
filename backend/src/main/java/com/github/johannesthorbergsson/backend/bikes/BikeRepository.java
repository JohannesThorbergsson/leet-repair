package com.github.johannesthorbergsson.backend.bikes;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeRepository extends MongoRepository<Bike, String> {
    List<Bike> findBikeByOwnerName (String username);
}
