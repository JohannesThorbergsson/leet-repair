package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("service_order")
public record ServiceOrder(
        @Id
        String id,
        String bikeId,
        String description,
        String workshop,
        String username,
        Status status,
        List<Component> componentsToReplace
) {
}
