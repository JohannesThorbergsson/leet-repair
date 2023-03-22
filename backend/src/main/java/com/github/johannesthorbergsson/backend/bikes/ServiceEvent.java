package com.github.johannesthorbergsson.backend.bikes;

import java.util.List;

public record ServiceEvent (
    String description,
    List<Component> newComponents,
    String workshopName,
    String date
){
}
