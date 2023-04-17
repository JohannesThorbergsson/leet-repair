package com.github.johannesthorbergsson.backend.orders;

import com.github.johannesthorbergsson.backend.exceptions.NoSuchOrderException;
import com.github.johannesthorbergsson.backend.exceptions.NoSuchWorkshopException;
import com.github.johannesthorbergsson.backend.exceptions.UnauthorizedAccessException;
import com.github.johannesthorbergsson.backend.id.IdService;
import com.github.johannesthorbergsson.backend.security.UserResponse;
import com.github.johannesthorbergsson.backend.security.UserService;
import com.github.johannesthorbergsson.backend.workshops.Workshop;
import com.github.johannesthorbergsson.backend.workshops.WorkshopRepository;
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
    private final WorkshopRepository workshopRepository;
    private final IdService idService;
    private final UserService userService;

    public List<ServiceOrder> getAllOrders(Principal principal){
        return orderRepository.findServiceOrderByUsername(principal.getName());
    }
    public List<ServiceOrder> getOrdersByWorkshopId(String id){
        return orderRepository.findServiceOrderByWorkshopId(id);
    }
    public ServiceOrder addOrder(Principal principal, ServiceOrderRequest serviceOrderRequest){
        ServiceOrder newOrder = new ServiceOrder(
                idService.generateId(),
                serviceOrderRequest.bikeId(),
                serviceOrderRequest.bikeName(),
                serviceOrderRequest.description(),
                serviceOrderRequest.workshop(),
                serviceOrderRequest.workshopId(),
                principal.getName(),
                Status.OPEN,
                LocalDate.now(),
                serviceOrderRequest.componentsToReplace());
        return orderRepository.save(newOrder);
    }
    public ServiceOrder updateOrder (String id, ServiceOrderRequest serviceOrderRequest, Principal principal) {
        UserResponse user = userService.getCurrentUser(principal);
        ServiceOrder orderToUpdate = orderRepository.findById(id).orElseThrow(NoSuchOrderException::new);
        Workshop workshop = workshopRepository.findById(serviceOrderRequest.workshopId())
                .orElseThrow(NoSuchWorkshopException::new);
        if (!orderToUpdate.username().equals(principal.getName()) && !workshop.id().equals(user.id())) {
            throw new UnauthorizedAccessException();
        }
        ServiceOrder editedOrder = new ServiceOrder(
                id,
                serviceOrderRequest.bikeId(),
                serviceOrderRequest.bikeName(),
                serviceOrderRequest.description(),
                serviceOrderRequest.workshop(),
                serviceOrderRequest.workshopId(),
                orderToUpdate.username(),
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
