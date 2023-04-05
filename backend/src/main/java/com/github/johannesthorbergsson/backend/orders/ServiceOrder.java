package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document("service_order")
public record ServiceOrder(
        @Id
        String id,
        String bikeId,
        String description,
        String workshop,
        String workshopId,
        String username,
        Status status,
        LocalDate date,
        List<Component> componentsToReplace
) {
}
