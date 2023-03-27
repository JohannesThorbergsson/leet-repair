package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;

import java.util.List;

public record ServiceOrderRequest(
        String bikeId,
        String description,
        String workshop,
        List<Component> componentsToReplace
) {
}
