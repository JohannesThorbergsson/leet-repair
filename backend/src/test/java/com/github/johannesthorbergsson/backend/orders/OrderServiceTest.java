package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.bikes.Component;
import com.github.johannesthorbergsson.backend.id.IdService;
import org.junit.jupiter.api.Test;

import java.security.Principal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class OrderServiceTest {

    OrderRepository orderRepository = mock(OrderRepository.class);
    IdService idService = mock(IdService.class);
    Principal principal = mock(Principal.class);
    List<Component> componentList = List.of(new Component("Tyre", "Pirelli", 1337));
    ServiceOrder testOrder = new ServiceOrder("1", "bid", "New Tyre", "Workshop42",
            "steven", Status.OPEN, componentList);
    OrderService orderService = new OrderService(orderRepository, idService);
    @Test
    void getAllOrders_whenOrdersMatchPrincipal_thenReturnListOfOrders() {
        //GIVEN
        when(orderRepository.findAll()).thenReturn(List.of(testOrder));
        when(principal.getName()).thenReturn("steven");
        //WHEN
        List<ServiceOrder> actual = orderService.getAllOrders(principal);
        List<ServiceOrder> expected = List.of(testOrder);
        //THEN
        assertEquals(expected, actual);
    }
}
