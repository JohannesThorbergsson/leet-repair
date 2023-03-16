package com.github.johannesthorbergsson.backend.security;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public record MongoUser(
    @Id
    String id,
    String username,
    String password,
    String role
){}
