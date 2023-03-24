package com.github.johannesthorbergsson.backend.bikes;

import java.util.List;

public record BikeRequest(
        String modelName,
        int mileage,
        List<Component> components,
        List<ServiceEvent> services
){
}
