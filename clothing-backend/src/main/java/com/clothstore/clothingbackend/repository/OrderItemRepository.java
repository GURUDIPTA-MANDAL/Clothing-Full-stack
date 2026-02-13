package com.clothstore.clothingbackend.repository;

import com.clothstore.clothingbackend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Get products of a specific order
    List<OrderItem> findByOrderId(Long orderId);
}
