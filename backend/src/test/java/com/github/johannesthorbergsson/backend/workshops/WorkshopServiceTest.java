package com.github.johannesthorbergsson.backend.workshops;

import com.github.johannesthorbergsson.backend.bikes.Component;
import com.github.johannesthorbergsson.backend.exceptions.NoSuchWorkshopException;
import com.github.johannesthorbergsson.backend.exceptions.UnauthorizedAccessException;
import com.github.johannesthorbergsson.backend.security.UserResponse;
import com.github.johannesthorbergsson.backend.security.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class WorkshopServiceTest {
    WorkshopService workshopService;
    WorkshopRepository workshopRepository = mock(WorkshopRepository.class);
    UserService userService = mock(UserService.class);
    UserResponse userResponseWorkshop = new UserResponse("1", "steven", "WORKSHOP");
    UserResponse userResponseBasic = new UserResponse("1", "steven", "BASIC");
    Principal principal = mock(Principal.class);
    Component tyre = new Component("tyre", "Pirelli", 1337);
    Coordinates testCoordinates = new Coordinates(new BigDecimal("-33.8599358"), new BigDecimal("151.2090295"));
    Workshop workshop1 = new Workshop("1", "workshop42", "workshop42", "Kasinostraße, Darmstadt",
            testCoordinates, new ArrayList<>(List.of("tyre", "chain")), List.of(tyre));
    WorkshopRequest workshop1Request =
            new WorkshopRequest(workshop1.id(), workshop1.name(), workshop1.location(), workshop1.coordinates(),
                    workshop1.services(), workshop1.inventory());
    WorkshopResponse workshop1Response =
            new WorkshopResponse(workshop1.id(), workshop1.name(), workshop1.location(), workshop1.coordinates(),
                    workshop1.services(), workshop1.inventory());
    Workshop workshop2 = new Workshop("1", "workshop1337", "workshop1337", "Kasinostraße, Darmstadt",
            testCoordinates, new ArrayList<>(List.of("tyre", "brakes")), List.of(tyre));
    String testId = "1";
    List<Workshop> expected = new ArrayList<>(List.of(workshop1, workshop2));

    @BeforeEach
    void setUp (){
        workshopService = new WorkshopService(workshopRepository, userService);
    }

    @Test
    void getAllWorkshops_whenGetAll_thenReturnListWithWorkshops() {
        //GIVEN
        when(workshopRepository.findAll()).thenReturn(new ArrayList<>(List.of(workshop1, workshop2)));
        //WHEN
        List<Workshop> actual = workshopService.getAllWorkshops();
        //THEN
        assertEquals(expected, actual);
    }
    @Test
    void addWorkshop_whenValidWorkshop_thenReturnSavedWorkshop(){
        //GIVEN
        when(principal.getName()).thenReturn("workshop42");
        when(userService.getCurrentUser(principal)).thenReturn(userResponseWorkshop);
        when(workshopRepository.save(workshop1)).thenReturn(workshop1);
        Workshop expected = workshop1;
        //WHEN
        Workshop actual = workshopService.addWorkshop(principal, workshop1Request);
        //THEN
        assertEquals(expected, actual);
        verify(principal).getName();
        verify(userService).getCurrentUser(principal);
        verify(workshopRepository).save(workshop1);
    }
    @Test
    void addWorkshop_whenBasicUser_thenThrowUnauthorizedAccessException(){
        //GIVEN
        when(userService.getCurrentUser(principal)).thenReturn(userResponseBasic);
        Class<UnauthorizedAccessException> expected = UnauthorizedAccessException.class;
        //WHEN
        assertThrows(expected, ()-> workshopService.addWorkshop(principal, workshop1Request));
        verify(userService).getCurrentUser(principal);
    }
    @Test
    void updateWorkshop_whenValidRequest_thenReturnWorkshopResponse(){
        //GIVEN
        when(workshopRepository.findById(testId)).thenReturn(Optional.of(workshop1));
        when(workshopRepository.save(workshop1)).thenReturn(workshop1);
        when(principal.getName()).thenReturn(workshop1.name());
        WorkshopResponse expected = workshop1Response;
        //WHEN
        WorkshopResponse actual = workshopService.updateWorkshop(testId, workshop1Request, principal);
        //THEN
        assertEquals(expected, actual);
        verify(workshopRepository).findById(testId);
        verify(workshopRepository).save(workshop1);
        verify(principal, times(2)).getName();
    }
    @Test
    void updateWorkshop_whenUnauthorizedAccess_thenThrowUnauthorizedAccessException(){
        //GIVEN
        when(workshopRepository.findById(testId)).thenReturn(Optional.of(workshop1));
        when(principal.getName()).thenReturn("h4xx()r");
        Class<UnauthorizedAccessException> expected = UnauthorizedAccessException.class;
        //WHEN + THEN
        assertThrows(expected, ()-> workshopService.updateWorkshop(testId, workshop1Request, principal));
        verify(workshopRepository).findById(testId);
        verify(principal).getName();
    }
    @Test
    void updateWorkshop_whenWorkshopNotFound_thenThrowNoSuchWorkshopException(){
        //GIVEN
        when(workshopRepository.findById(testId)).thenReturn(Optional.empty());
        Class<NoSuchWorkshopException> expected = NoSuchWorkshopException.class;
        //WHEN + THEN
        assertThrows(expected, ()-> workshopService.updateWorkshop(testId, workshop1Request, principal));
        verify(workshopRepository).findById(testId);
    }
}
