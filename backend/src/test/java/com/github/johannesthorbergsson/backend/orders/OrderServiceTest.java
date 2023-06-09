package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import com.github.johannesthorbergsson.backend.exceptions.NoSuchOrderException;
import com.github.johannesthorbergsson.backend.exceptions.UnauthorizedAccessException;
import com.github.johannesthorbergsson.backend.id.IdService;
import com.github.johannesthorbergsson.backend.security.UserResponse;
import com.github.johannesthorbergsson.backend.security.UserService;
import com.github.johannesthorbergsson.backend.workshops.Coordinates;
import com.github.johannesthorbergsson.backend.workshops.Workshop;
import com.github.johannesthorbergsson.backend.workshops.WorkshopService;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    OrderRepository orderRepository = mock(OrderRepository.class);
    WorkshopService workshopService = mock(WorkshopService.class);
    IdService idService = mock(IdService.class);
    Principal principal = mock(Principal.class);
    UserService userService = mock(UserService.class);
    UserResponse userResponseBasic = new UserResponse("2", "steven", "BASIC");
    UserResponse userResponseWorkshop = new UserResponse("1", "steven", "WORKSHOP");
    List<Component> componentList = List.of(new Component("Tyre", "Pirelli", 1337));
    Coordinates testCoordinates = new Coordinates(new BigDecimal("-33.8599358"), new BigDecimal("151.2090295"));
    Workshop workshop1 = new Workshop("1", "workshop42", "Kasinostraße, Darmstadt",
            testCoordinates, new ArrayList<>(List.of("tyre", "chain")), componentList);
    ServiceOrder testOrder = new ServiceOrder("1", "bid", "Amazing Bike", "New Tyre",
            "Workshop42", "1", "steven",
            Status.OPEN, LocalDate.of(2022, 2, 1), componentList);
    ServiceOrderRequest testOrderRequest = new ServiceOrderRequest("bid", "Amazing Bike","New Tyre",
            "Workshop42", "1", Status.OPEN, LocalDate.of(2022, 2, 1), componentList);
    OrderService orderService = new OrderService(orderRepository, workshopService, idService, userService);
    String testId = "1", invalidID = "Invalid";

    @Test
    void getAllOrders_whenOrdersMatchPrincipal_thenReturnListOfOrders() {
        //GIVEN
        when(orderRepository.findServiceOrderByUsername("steven")).thenReturn(List.of(testOrder));
        when(principal.getName()).thenReturn("steven");
        List<ServiceOrder> expected = List.of(testOrder);
        //WHEN
        List<ServiceOrder> actual = orderService.getAllOrders(principal);
        //THEN
        assertEquals(expected, actual);
        verify(orderRepository).findServiceOrderByUsername("steven");
        verify(principal).getName();
    }
    @Test
    void getOrdersByWorkshopId_whenOrders_thenReturnListOfOrders(){
        //GIVEN
        when(orderRepository.findServiceOrderByWorkshopId(testId)).thenReturn(List.of(testOrder));
        List<ServiceOrder> expected = List.of(testOrder);
        //WHEN
        List<ServiceOrder> actual = orderService.getOrdersByWorkshopId(testId);
        //THEN
        assertEquals(expected, actual);
        verify(orderRepository).findServiceOrderByWorkshopId(testId);
    }
    @Test
    void addOrder_whenOrderRequest_thenReturnSavedOrder(){
        LocalDate testDate = LocalDate.of(2022, 2, 1);
        try(MockedStatic<LocalDate> mockedStatic = mockStatic(LocalDate.class)) {
            //GIVEN
            mockedStatic.when(LocalDate::now).thenReturn(testDate);
            when(idService.generateId()).thenReturn("1");
            when(principal.getName()).thenReturn("steven");
            when(orderRepository.save(testOrder)).thenReturn(testOrder);
            //WHEN
            ServiceOrder actual = orderService.addOrder(principal, testOrderRequest);
            ServiceOrder expected = testOrder;
            //THEN
            verify(orderRepository).save(testOrder);
            verify(idService).generateId();
            verify(principal).getName();
            mockedStatic.verify(LocalDate::now);
            assertEquals(expected, actual);
        }
    }
    @Test
    void updateOrder_whenValidRequest_thenReturnUpdatedOrder(){
        //GIVEN
        when(orderRepository.findById(testId)).thenReturn(Optional.of(testOrder));
        when(orderRepository.save(testOrder)).thenReturn(testOrder);
        when(workshopService.getWorkshopById(testId)).thenReturn(workshop1);
        when(principal.getName()).thenReturn("steven");
        ServiceOrder expected = testOrder;
        //WHEN
        ServiceOrder actual = orderService.updateOrder(testId, testOrderRequest, principal);
        //THEN
        verify(orderRepository).findById(testId);
        verify(orderRepository).save(testOrder);
        verify(workshopService).getWorkshopById(testId);
        verify(principal).getName();
        assertEquals(expected, actual);
    }
    @Test
    void updateOrder_whenValidRequestAsWorkshop_thenReturnUpdatedOrder(){
        //GIVEN
        when(orderRepository.findById(testId)).thenReturn(Optional.of(testOrder));
        when(orderRepository.save(testOrder)).thenReturn(testOrder);
        when(workshopService.getWorkshopById(testId)).thenReturn(workshop1);
        when(userService.getCurrentUser(principal)).thenReturn(userResponseWorkshop);
        when(principal.getName()).thenReturn("workshop42");
        ServiceOrder expected = testOrder;
        //WHEN
        ServiceOrder actual = orderService.updateOrder(testId, testOrderRequest, principal);
        //THEN
        verify(orderRepository).findById(testId);
        verify(orderRepository).save(testOrder);
        verify(workshopService).getWorkshopById(testId);
        verify(userService).getCurrentUser(principal);
        verify(principal).getName();
        assertEquals(expected, actual);
    }
    @Test
    void updateOrder_whenOrderNotFound_thenThrowNoSuchOrderException(){
        //GIVEN
        when(orderRepository.findById(invalidID)).thenReturn(Optional.empty());
        Class<NoSuchOrderException> expected = NoSuchOrderException.class;
        //WHEN + THEN
        assertThrows(expected, () -> orderService.updateOrder(invalidID, testOrderRequest, principal));
        verify(orderRepository).findById(invalidID);
    }
    @Test
    void updateOrder_whenUnauthorizedAccess_thenThrow_UnauthorizedAccessException(){
        //GIVEN
        when(orderRepository.findById(testId)).thenReturn(Optional.of(testOrder));
        when(workshopService.getWorkshopById(testId)).thenReturn(workshop1);
        when(userService.getCurrentUser(principal)).thenReturn(userResponseBasic);
        when(principal.getName()).thenReturn("h4xx()r");
        Class<UnauthorizedAccessException> expected = UnauthorizedAccessException.class;
        //WHEN + THEN
        assertThrows(expected, () -> orderService.updateOrder(testId, testOrderRequest, principal));
        verify(orderRepository).findById(testId);
        verify(workshopService).getWorkshopById(testId);
        verify(userService).getCurrentUser(principal);
        verify(principal).getName();
    }
    @Test
    void deleteOrder_whenValidRequest_thenReturnDeletedOrder(){
        //GIVEN
        when(orderRepository.findById(testId)).thenReturn(Optional.of(testOrder));
        when(principal.getName()).thenReturn("steven");
        ServiceOrder expected = testOrder;
        //WHEN
        ServiceOrder actual = orderService.deleteOrder(testId, principal);
        //THEN
        assertEquals(expected, actual);
        verify(orderRepository).findById(testId);
        verify(orderRepository).deleteById(testId);
        verify(principal).getName();
    }
    @Test
    void deleteOrder_whenOrderNotFound_thenThrowNoSuchOrderException(){
        //GIVEN
        when(orderRepository.findById(testId)).thenReturn(Optional.empty());
        Class<NoSuchOrderException> expected = NoSuchOrderException.class;
        //THEN
        assertThrows(expected, ()->orderService.deleteOrder(testId, principal));
        verify(orderRepository).findById(testId);
    }
    @Test
    void deleteOrder_whenUnauthorizedAccess_thenThrowUnauthorizedAccessException(){
        //GIVEN
        when(orderRepository.findById(testId)).thenReturn(Optional.of(testOrder));
        when(principal.getName()).thenReturn("h4xx()r");
        Class<UnauthorizedAccessException> expected = UnauthorizedAccessException.class;
        //THEN
        assertThrows(expected, ()-> orderService.deleteOrder(testId, principal));
        verify(orderRepository).findById(testId);
        verify(principal).getName();
    }
}
