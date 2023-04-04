package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkshopService {
    private final WorkshopRepository workshopRepository;
    private final IdService idService;

    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }
    public Workshop addWorkshop(Principal principal, WorkshopRequest workshopRequest){
        Workshop newWorkshop = new Workshop(
                idService.generateId(),
                workshopRequest.name(),
                principal.getName(),
                workshopRequest.services(),
                workshopRequest.inventory());
        return workshopRepository.save(newWorkshop);
    }
}
