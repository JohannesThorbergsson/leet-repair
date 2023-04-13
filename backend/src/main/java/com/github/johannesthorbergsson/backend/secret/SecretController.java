package com.github.johannesthorbergsson.backend.secret;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/secrets/")
@RequiredArgsConstructor
public class SecretController {

    @Value("${REACT_APP_MAP_KEY}")
    private final String mapApiKey;

    @GetMapping
    public String getApiSecret(){
        return mapApiKey;
    }
}
