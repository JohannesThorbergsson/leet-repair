package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.bikes.Component;

import java.util.List;

public record WorkshopRequest(
        String id,
        String name,
        String location,
        Coordinates coordinates,
        List<String> services,
        List<Component> inventory
) {
}
