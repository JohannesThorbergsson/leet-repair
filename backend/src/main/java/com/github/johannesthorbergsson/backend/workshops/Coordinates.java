package com.github.johannesthorbergsson.backend.workshops;

import java.math.BigDecimal;

public record Coordinates(
        BigDecimal lat,
        BigDecimal lng
) {
}
