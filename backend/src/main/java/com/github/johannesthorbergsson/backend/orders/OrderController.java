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
    public List<ServiceOrder> getOrdersByBikeOwner(Principal principal) {
        return orderService.getAllOrders(principal);
    }
    @GetMapping("{id}")
    public List<ServiceOrder> getOrdersByWorkshop(@PathVariable String id){
        return orderService.getOrdersByWorkshopId(id);
    }
    @PostMapping
    public ServiceOrder addOrder(Principal principal, @RequestBody ServiceOrderRequest serviceOrderRequest){
        return orderService.addOrder(principal, serviceOrderRequest);
    }
    @PutMapping("{id}")
    public ServiceOrder updateOrder(@PathVariable String id, @RequestBody ServiceOrderRequest serviceOrderRequest, Principal principal) {
        return orderService.updateOrder(id, serviceOrderRequest, principal);
    }
    @DeleteMapping("{id}")
    public ServiceOrder deleteOrder(@PathVariable String id, Principal principal){
        return orderService.deleteOrder(id, principal);
    }
}
