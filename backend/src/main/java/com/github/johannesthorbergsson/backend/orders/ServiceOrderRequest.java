package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

public record ServiceOrderRequest(
        String bikeId,
        String description,
        String workshop,
        List<Component> componentsToReplace
) {
}
