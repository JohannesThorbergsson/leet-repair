package com.github.johannesthorbergsson.backend.bikes;

import java.util.List;

public record BikeEditRequest (
        String id,
        String modelName,
        String ownerName,
        int mileage,
        List<Component> components,
        List<ServiceEvent> services
){
}
