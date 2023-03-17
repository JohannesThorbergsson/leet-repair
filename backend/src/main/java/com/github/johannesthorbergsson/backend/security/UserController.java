package com.github.johannesthorbergsson.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/login")
    public UserResponse login(Principal principal) {
        return getCurrentUser(principal);
    }
    @GetMapping("/me")
    public UserResponse getCurrentUser(Principal principal) {
        return userService.getCurrentUser(principal);
    }
}
