package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.exceptions.NoSuchOrderException;
import com.github.johannesthorbergsson.backend.exceptions.UnauthorizedAccessException;
import com.github.johannesthorbergsson.backend.id.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final IdService idService;

    public List<ServiceOrder> getAllOrders(Principal principal){
        return orderRepository.findServiceOrderByUsername(principal.getName());
    }
    public ServiceOrder addOrder(Principal principal, ServiceOrderRequest serviceOrderRequest){
        ServiceOrder newOrder = new ServiceOrder(
                idService.generateId(),
                serviceOrderRequest.bikeId(),
                serviceOrderRequest.description(),
                serviceOrderRequest.workshop(),
                principal.getName(),
                Status.OPEN,
                LocalDate.now(),
                serviceOrderRequest.componentsToReplace());
        return orderRepository.save(newOrder);
    }
    public ServiceOrder updateOrder (String id, ServiceOrderRequest serviceOrderRequest, Principal principal) {
        if (!orderRepository.findById(id).orElseThrow(NoSuchOrderException::new).username().equals(principal.getName())) {
            throw new UnauthorizedAccessException();
        }
        ServiceOrder editedOrder = new ServiceOrder(
                id,
                serviceOrderRequest.bikeId(),
                serviceOrderRequest.description(),
                serviceOrderRequest.workshop(),
                principal.getName(),
                serviceOrderRequest.status(),
                serviceOrderRequest.date(),
                serviceOrderRequest.componentsToReplace()
        );
        return orderRepository.save(editedOrder);
    }
    public ServiceOrder deleteOrder(String id, Principal principal){
        Optional<ServiceOrder> orderToDeleteOptional = orderRepository.findById(id);
        ServiceOrder orderToDelete = orderToDeleteOptional.orElseThrow(NoSuchOrderException::new);
        if (!orderToDelete.username().equals(principal.getName())) {
            throw new UnauthorizedAccessException();
        }
        orderRepository.deleteById(id);
        return orderToDelete;
    }
}
