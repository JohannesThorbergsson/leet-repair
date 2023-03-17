package com.github.johannesthorbergsson.backend.security;

import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository repository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new User(user.username(), user.password(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.role())));
    }
    public UserResponse getCurrentUser(Principal principal) {
        MongoUser user = repository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        return new UserResponse(user.id(), user.username(), user.role());
    }

    public UserResponse createUser(UserRequest user) {
        if (user.username() == null || user.username().length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }
        if (user.password() == null || user.password().length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }
        if (repository.existsByUsername(user.username())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        MongoUser newUser = new MongoUser(idService.generateId(), user.username(),
                passwordEncoder.encode(user.password()), "BASIC");
        MongoUser savedUser = repository.save(newUser);
        return new UserResponse(savedUser.id(), savedUser.username(), savedUser.role());
    }
}
