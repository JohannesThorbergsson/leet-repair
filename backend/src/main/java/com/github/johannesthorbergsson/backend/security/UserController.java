package com.github.johannesthorbergsson.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    //NOSONAR this method is empty
    @PostMapping("/logout")
    public void logout() {
        // logout is handled by Spring Security
    }
}
