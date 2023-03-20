package com.github.johannesthorbergsson.backend.workshops;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkshopRepository extends MongoRepository<Workshop, String> {
    Optional<Workshop> findByName(String name);
}
