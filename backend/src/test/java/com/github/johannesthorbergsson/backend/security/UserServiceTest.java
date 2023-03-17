package com.github.johannesthorbergsson.backend.security;

import com.github.johannesthorbergsson.backend.id.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UserServiceTest {

    UserService userService;
    UserRepository userRepository = mock(UserRepository.class);
    Principal principal = mock(Principal.class);
    MongoUser mongoUser = new MongoUser("1", "name", "11", "BASIC");
    UserResponse userResponse = new UserResponse(mongoUser.id(), mongoUser.username(), mongoUser.role());
    UserRequest userRequest = new UserRequest(mongoUser.username(), mongoUser.password());
    IdService idService = mock(IdService.class);
    PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);

    @BeforeEach
    void setUp() {
        when(userRepository.findByUsername(mongoUser.username())).thenReturn(Optional.ofNullable(mongoUser));
        when(idService.generateId()).thenReturn(mongoUser.id());
        userService = new UserService(userRepository, idService, passwordEncoder);

    }
    @Test
    void loadUserByUsername_whenUserExists_thenReturnUserResponse() {
        //GIVEN
        GrantedAuthority grantedAuthority = () -> "ROLE_" + mongoUser.role();
        Collection<GrantedAuthority> mongoUserAuthorities = new ArrayList<>(List.of(grantedAuthority));
        UserDetails expected = new User(mongoUser.username(), mongoUser.password(), mongoUserAuthorities);
        //WHEN
        UserDetails actual = userService.loadUserByUsername(mongoUser.username());
        //THEN
        assertEquals(expected, actual);
    }
    @Test
    void loadUserByUsername_whenUserNotFound_thenThrowException(){
        //GIVEN
        UsernameNotFoundException expected = new UsernameNotFoundException("User not found");
        //WHEN
        UsernameNotFoundException actual = assertThrows(expected.getClass(), () -> userService.loadUserByUsername("Invalid"));
        //THEN
        assertEquals(expected.getClass(), actual.getClass());
        assertEquals(expected.getMessage(), actual.getMessage());
    }

    @Test
    void getCurrentUser_whenValidUser_thenReturnUser() {
        //GIVEN
        when(principal.getName()).thenReturn(mongoUser.username());
        UserResponse expected = userResponse;
        //WHEN
        UserResponse actual = userService.getCurrentUser(principal);
        //THEN
        verify(principal).getName();
        verify(userRepository).findByUsername(mongoUser.username());
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
        verify(principal).getName();
        verify(userRepository).findByUsername("invalid");
        assertEquals(expected.getClass(), actual.getClass());
        assertEquals(expected.getMessage(), actual.getMessage());
    }
    @Test
    void createUser_whenUserCreated_thenReturnUserResponse() {
        //GIVEN
        when(userRepository.save(mongoUser)).thenReturn(mongoUser);
        when(passwordEncoder.encode(mongoUser.password())).thenReturn("11");
        UserResponse expected = userResponse;
        //WHEN
        UserResponse actual = userService.createUser(userRequest);
        //THEN
        verify(userRepository).save(mongoUser);
        assertEquals(expected, actual);
    }
    @Test
    void createUser_whenUsernameNotUnique_thenThrowResponseStatusException() {
        //GIVEN
        when(userRepository.existsByUsername(mongoUser.username())).thenReturn(true);
        HttpStatus expected = HttpStatus.CONFLICT;
        //WHEN
        ResponseStatusException actual = assertThrows(ResponseStatusException.class, () -> userService.createUser(userRequest));
        //THEN
        verify(userRepository).existsByUsername(mongoUser.username());
        assertEquals(expected, actual.getStatusCode());
    }
    @Test
    void createUser_whenUsernameEmpty_thenThrowResponseStatusException() {
        //GIVEN
        UserRequest noUsername = new UserRequest("", "1");
        HttpStatus expected = HttpStatus.BAD_REQUEST;
        //WHEN
        ResponseStatusException actual = assertThrows(ResponseStatusException.class, () -> userService.createUser(noUsername));
        //THEN
        assertEquals(expected, actual.getStatusCode());
    }
    @Test
    void createUser_whenUsernameNull_thenThrowResponseStatusException() {
        //GIVEN
        UserRequest noUsername = new UserRequest(null, "1");
        HttpStatus expected = HttpStatus.BAD_REQUEST;
        //WHEN
        ResponseStatusException actual = assertThrows(ResponseStatusException.class, () -> userService.createUser(noUsername));
        //THEN
        assertEquals(expected, actual.getStatusCode());
    }
    @Test
    void createUser_whenPasswordEmpty_thenThrowResponseStatusException() {
        //GIVEN
        UserRequest noPassword = new UserRequest("1", "");
        HttpStatus expected = HttpStatus.BAD_REQUEST;
        //WHEN
        ResponseStatusException actual = assertThrows(ResponseStatusException.class, () -> userService.createUser(noPassword));
        //THEN
        assertEquals(expected, actual.getStatusCode());
    }
    @Test
    void createUser_whenPasswordNull_thenThrowResponseStatusException() {
        //GIVEN
        UserRequest noPassword = new UserRequest("1", null);
        HttpStatus expected = HttpStatus.BAD_REQUEST;
        //WHEN
        ResponseStatusException actual = assertThrows(ResponseStatusException.class, () -> userService.createUser(noPassword));
        //THEN
        assertEquals(expected, actual.getStatusCode());
    }
}
