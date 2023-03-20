package com.github.johannesthorbergsson.backend.bikes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("bike")
public record Bike (
        @Id
        String id,
        String modelName,
        int mileage,
        List<Component> components

){
}
