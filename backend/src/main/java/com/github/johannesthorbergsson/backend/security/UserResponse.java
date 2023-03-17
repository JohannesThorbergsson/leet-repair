package com.github.johannesthorbergsson.backend.security;

public record UserResponse(
        String id,
        String username,
        String role
) {
}
