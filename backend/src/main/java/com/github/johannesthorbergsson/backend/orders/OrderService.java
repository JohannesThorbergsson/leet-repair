package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final IdService idService;

    public List<ServiceOrder> getAllOrders(Principal principal){
        return orderRepository.findAll().stream()
                .filter(order -> order.username().equals(principal.getName())).toList();
    }

}
