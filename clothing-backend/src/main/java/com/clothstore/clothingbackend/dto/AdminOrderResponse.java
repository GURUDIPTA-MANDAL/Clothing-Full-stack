package com.clothstore.clothingbackend.dto;

import java.time.LocalDateTime;

public class AdminOrderResponse {

    private Long orderId;
    private String customerName;
    private double totalAmount;
    private String status;
    private LocalDateTime orderDate;

    public AdminOrderResponse(
            Long orderId,
            String customerName,
            double totalAmount,
            String status,
            LocalDateTime orderDate
    ) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.totalAmount = totalAmount;
        this.status = status;
        this.orderDate = orderDate;
    }

    // getters only (no setters needed)
    public Long getOrderId() { return orderId; }
    public String getCustomerName() { return customerName; }
    public double getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public LocalDateTime getOrderDate() { return orderDate; }
}
