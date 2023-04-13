package com.github.johannesthorbergsson.backend.secret;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/secrets/")
@AllArgsConstructor
public class SecretController {
    @GetMapping
    public String getApiSecret(){
        return System.getenv("REACT_APP_MAP_KEY");
    }
}
