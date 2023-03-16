package com.github.johannesthorbergsson.backend.security;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public record MongoUser(
    String id,
    String username,
    String password,
    String role
){}
