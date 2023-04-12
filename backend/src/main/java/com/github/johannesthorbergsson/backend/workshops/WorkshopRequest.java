package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.bikes.Component;

import java.util.List;

public record WorkshopRequest(
        String id,
        String name,
        Coordinates coordinates,
        List<String> services,
        List<Component> inventory
) {
}
