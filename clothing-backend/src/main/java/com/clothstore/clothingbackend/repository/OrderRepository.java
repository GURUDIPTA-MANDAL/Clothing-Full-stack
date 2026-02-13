package com.clothstore.clothingbackend.repository;

import com.clothstore.clothingbackend.dto.AdminOrderResponse;
import com.clothstore.clothingbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    // ✅ ADMIN VIEW WITH CUSTOMER NAME
    @Query("""
        SELECT new com.clothstore.clothingbackend.dto.AdminOrderResponse(
            o.id,
            u.username,
            o.totalAmount,
            o.status,
            o.orderDate
        )
        FROM Order o
        JOIN User u ON o.userId = u.id
    """)
    List<AdminOrderResponse> getAdminOrders();
}
