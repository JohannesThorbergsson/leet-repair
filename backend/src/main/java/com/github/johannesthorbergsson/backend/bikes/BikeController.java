package com.github.johannesthorbergsson.backend.bikes;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/bikes/")
@RequiredArgsConstructor
public class BikeController {
    private final BikeService bikeService;

    @GetMapping
    public List<Bike> getAllBikes(Principal principal){
        return bikeService.getAllBikes(principal);
    }
}
