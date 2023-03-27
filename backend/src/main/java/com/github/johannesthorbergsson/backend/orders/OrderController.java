package com.github.johannesthorbergsson.backend.orders;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/orders/")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public List<ServiceOrder> getAllOrders(Principal principal) {
        return orderService.getAllOrders(principal);
    }
    @PostMapping
    public ServiceOrder addOrder(Principal principal, @RequestBody ServiceOrderRequest serviceOrderRequest){
        return orderService.addOrder(principal, serviceOrderRequest);
    }
}
