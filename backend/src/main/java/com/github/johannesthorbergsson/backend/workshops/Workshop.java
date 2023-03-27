package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.bikes.Component;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("workshop")
public record Workshop(
        @Id
        String id,
        String name,
        List<String> services,
        List<Component> inventory
) {
}
