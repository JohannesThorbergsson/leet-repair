package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.exceptions.NoSuchWorkshopException;
import com.github.johannesthorbergsson.backend.exceptions.UnauthorizedAccessException;
import com.github.johannesthorbergsson.backend.security.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkshopService {
    private final WorkshopRepository workshopRepository;
    private final UserService userService;

    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }
    public Workshop addWorkshop(Principal principal, WorkshopRequest workshopRequest){
        if(!userService.getCurrentUser(principal).role().equals("WORKSHOP")) {
           throw new UnauthorizedAccessException();
        }
        Workshop newWorkshop = new Workshop(
                workshopRequest.id(),
                workshopRequest.name(),
                principal.getName(),
                workshopRequest.location(),
                workshopRequest.coordinates(),
                workshopRequest.services(),
                workshopRequest.inventory());
        return workshopRepository.save(newWorkshop);
    }
    public WorkshopResponse updateWorkshop(String id, WorkshopRequest workshopRequest, Principal principal){
        if(!workshopRepository.findById(id).orElseThrow(NoSuchWorkshopException::new).username().equals(principal.getName())){
            throw new UnauthorizedAccessException();
        }
        Workshop updatedWorkshop = workshopRepository.save(new Workshop(
                id,
                workshopRequest.name(),
                principal.getName(),
                workshopRequest.location(),
                workshopRequest.coordinates(),
                workshopRequest.services(),
                workshopRequest.inventory()));
        return new WorkshopResponse(
                updatedWorkshop.id(),
                updatedWorkshop.name(),
                updatedWorkshop.location(),
                updatedWorkshop.coordinates(),
                updatedWorkshop.services(),
                updatedWorkshop.inventory());
    }
}
