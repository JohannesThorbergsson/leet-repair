package com.github.johannesthorbergsson.backend.security;

public record UserRequest(
        String username,
        String password) {
}
