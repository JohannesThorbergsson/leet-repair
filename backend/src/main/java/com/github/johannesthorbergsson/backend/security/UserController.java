package com.github.johannesthorbergsson.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    @PostMapping("/login")
    @ResponseStatus(code = HttpStatus.CREATED)
    public UserResponse login(Principal principal) {
        return null;
    }
}
