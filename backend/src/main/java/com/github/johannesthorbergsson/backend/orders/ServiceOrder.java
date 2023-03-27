package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("serviceOrder")
public record ServiceOrder(
        @Id
        String id,
        String bikeId,
        String description,
        Status status,
        List<Component> componentsToReplace
) {
}