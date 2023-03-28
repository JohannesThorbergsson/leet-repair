package com.github.johannesthorbergsson.backend.orders;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<ServiceOrder, String> {
}
