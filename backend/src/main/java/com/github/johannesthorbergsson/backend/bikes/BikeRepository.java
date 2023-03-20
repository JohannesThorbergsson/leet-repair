package com.github.johannesthorbergsson.backend.bikes;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends MongoRepository<Bike, String> {

}
