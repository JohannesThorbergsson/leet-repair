package com.github.johannesthorbergsson.backend.orders;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<ServiceOrder, String> {
    List<ServiceOrder> findServiceOrderByUsername(String username);
    List<ServiceOrder> findServiceOrderByWorkshopId(String workshopId);
}
