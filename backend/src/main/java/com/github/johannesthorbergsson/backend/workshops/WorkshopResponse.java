package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.springframework.data.annotation.Id;

import java.util.List;

public record WorkshopResponse(
        @Id
        String id,
        String name,
        String location,
        Coordinates coordinates,
        List<String> services,
        List<Component> inventory
) {
}
