package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkshopService {
    private final WorkshopRepository workshopRepository;
    private final IdService idService;

    public List<Workshop> getAllWorkshops() {
        return workshopRepository.findAll();
    }
}
