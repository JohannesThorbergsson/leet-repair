package com.github.johannesthorbergsson.backend.security;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public record User (
    String id,
    String username,
    String password,
    String role
){}
