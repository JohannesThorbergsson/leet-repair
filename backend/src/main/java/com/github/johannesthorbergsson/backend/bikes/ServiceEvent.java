package com.github.johannesthorbergsson.backend.bikes;

import java.time.LocalDate;
import java.util.List;

public record ServiceEvent (
    String description,
    List<Component> newComponents,
    String workshopName,
    LocalDate date
){
}
