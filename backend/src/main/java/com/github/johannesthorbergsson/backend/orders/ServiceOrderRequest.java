package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;

import java.time.LocalDate;
import java.util.List;

public record ServiceOrderRequest(
        String bikeId,
        String bikeName,
        String description,
        String workshop,
        String workshopId,
        Status status,
        LocalDate date,
        List<Component> componentsToReplace
) {
}
