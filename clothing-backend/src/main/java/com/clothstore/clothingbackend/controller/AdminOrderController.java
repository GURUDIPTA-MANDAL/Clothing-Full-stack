package com.clothstore.clothingbackend.controller;

import com.clothstore.clothingbackend.dto.AdminOrderResponse;
import com.clothstore.clothingbackend.entity.Order;
import com.clothstore.clothingbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "*")
public class AdminOrderController {

    @Autowired
    private OrderRepository orderRepository;

    //  VIEW ALL ORDERS (WITH ITEMS)
    @GetMapping
    public List<AdminOrderResponse> getAllOrders() {
        return orderRepository.getAdminOrders();
    }

    @GetMapping("/{orderId}")
    public Order getOrderDetails(@PathVariable Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }



    //  UPDATE STATUS (SHIP / DELIVER / CANCEL)
    @PutMapping("/{orderId}/status")
    public Order updateStatus(
            @PathVariable Long orderId,
            @RequestParam String status
    ) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}
