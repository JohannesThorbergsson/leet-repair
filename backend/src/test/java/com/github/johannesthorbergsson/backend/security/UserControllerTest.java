package com.github.johannesthorbergsson.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserRepository userRepository;
    Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    MongoUser mongoUser = new MongoUser("1", "name", "11", "BASIC");

    @Test
    @DirtiesContext
    void login_whenUserExists_thenReturnUserResponse() throws Exception {
        //GIVEN
        MongoUser expected = new MongoUser(mongoUser.id(), mongoUser.username(), encoder.encode(mongoUser.password()), mongoUser.role());
        userRepository.save(expected);
        //WHEN
        mockMvc.perform(post("/api/users/login")
                    .with(httpBasic(mongoUser.username(), mongoUser.password()))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{}")
                    .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "username": "name",
                            "role": "BASIC"
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
    @Test
    @DirtiesContext
    void login_whenUserCredentialsInvalid_whenStatusUnauthorized() throws Exception {
        mockMvc.perform(post("/api/users/login")
                    .with(httpBasic("invalidUsername", "invalidPassword"))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{}")
                    .with(csrf()))
                .andExpect(status().isUnauthorized());
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "name", roles = {"BASIC"})
    void getCurrentUser_whenAuthenticated_thenReturnUser() throws Exception {
        //GIVEN
        userRepository.save(mongoUser);
        //WHEN
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
							{
								"username": "name",
								"role": "BASIC"
							}
							"""))
                .andExpect(jsonPath("$.id").isNotEmpty());

    }
    @Test
    @DirtiesContext
    @WithMockUser
    void getCurrentUser_whenNotAuthenticated_thenStatusIsUnauthorised() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }
    @Test
    @DirtiesContext
    void create_whenCreated_thenStatus201() throws Exception {
        mockMvc.perform(post("/api/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
									{
										"username": "Test user",
										"password": "Test password"
									}
									""").with(csrf()))
                .andExpect(status().isCreated());
    }
    @Test
    @DirtiesContext
    void create_whenUsernameExists_thenStatus409() throws Exception {
        //GIVEN
        userRepository.save(mongoUser);
        //THEN
        mockMvc.perform(post("/api/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
									{
										"username": "name",
										"password": "Test password"
									}
									""")
                        .with(csrf()))
                .andExpect(status().isConflict());
    }
    @Test
    @DirtiesContext
    void create_whenUsernameMissing_thenStatus400() throws Exception {
        mockMvc.perform(post("/api/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
									{
										"username": "",
										"password": "password"
									}
									""")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }
    @Test
    @DirtiesContext
    void create_whenPasswordMissing_thenStatus400() throws Exception {
        mockMvc.perform(post("/api/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
									{
										"username": "Test user",
										"password": ""
									}
									""")
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }
}