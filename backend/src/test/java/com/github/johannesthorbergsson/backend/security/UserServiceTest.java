package com.github.johannesthorbergsson.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    UserService userService;
    UserRepository userRepository = mock(UserRepository.class);
    Principal principal = mock(Principal.class);
    MongoUser mongoUser = new MongoUser("1", "name", "11", "BASIC");
    UserResponse userResponse = new UserResponse(mongoUser.id(), mongoUser.username(), mongoUser.role());

    @BeforeEach
    void setUp() {
        when(userRepository.findByUsername(mongoUser.username())).thenReturn(Optional.ofNullable(mongoUser));
        userService = new UserService(userRepository);
    }
    @Test
    void loadUserByUsername() {
    }

    @Test
    @DirtiesContext
    void getCurrentUser_whenValidUser_thenReturnUser() {
        //GIVEN
        when(principal.getName()).thenReturn(mongoUser.username());
        userRepository.save(mongoUser);
        UserResponse expected = userResponse;
        //WHEN
        UserResponse actual = userService.getCurrentUser(principal);
        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void getCurrentUser_whenInvalidUser_thenThrowException() {
        //GIVEN
        when(principal.getName()).thenReturn("invalid");
        ResponseStatusException expected = new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
        //WHEN
        ResponseStatusException actual = assertThrows(ResponseStatusException.class, () -> userService.getCurrentUser(principal));
        //THEN
        assertEquals(expected.getClass(), actual.getClass());
        assertEquals(expected.getMessage(), actual.getMessage());
    }

}