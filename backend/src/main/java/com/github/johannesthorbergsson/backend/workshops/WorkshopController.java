package com.github.johannesthorbergsson.backend.workshops;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/workshops/")
@RequiredArgsConstructor
public class WorkshopController {
    private final WorkshopService workshopService;

    @GetMapping
    public List<Workshop> getAllWorkshops() {
        return workshopService.getAllWorkshops();
    }

    @PostMapping
    public Workshop addWorkshop(@RequestBody WorkshopRequest workshopRequest, Principal principal){
        return workshopService.addWorkshop(principal, workshopRequest);
    }
    @PutMapping("{id}")
    public WorkshopResponse updateWorkshop(@PathVariable String id, @RequestBody WorkshopRequest workshopRequest, Principal principal){
        return workshopService.updateWorkshop(id, workshopRequest, principal);
    }
}
