package com.clothstore.clothingbackend.controller;

import com.clothstore.clothingbackend.entity.*;
import com.clothstore.clothingbackend.repository.*;
import com.clothstore.clothingbackend.request.OrderRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderAddressRepository orderAddressRepository;

    //  CONSTRUCTOR
    public OrderController(OrderRepository orderRepository,
                           CartRepository cartRepository,
                           ProductRepository productRepository,
                           OrderAddressRepository orderAddressRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.orderAddressRepository = orderAddressRepository;
    }

    //  PLACE ORDER (WITH ADDRESS)
    @PostMapping("/place")
    public Order placeOrder(@RequestBody OrderRequest request) {

        //  CREATE ORDER
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setStatus("CONFIRMED");
        order.setOrderDate(LocalDateTime.now());

        //  FETCH CART ITEMS
        List<Cart> cartItems = cartRepository.findByUserId(request.getUserId());

        double totalAmount = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        //  CREATE ORDER ITEMS
        for (Cart cart : cartItems) {

            Product product = productRepository.findById(cart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setProductImage(product.getImageUrl());
            item.setPrice(product.getPrice());
            item.setQuantity(cart.getQuantity());

            totalAmount += product.getPrice() * cart.getQuantity();
            orderItems.add(item);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);

        // 4️⃣ SAVE ORDER
        Order savedOrder = orderRepository.save(order);

        // 5️⃣ SAVE ORDER ADDRESS  ✅
        OrderAddress address = new OrderAddress();
        address.setOrder(savedOrder);
        address.setFullName(request.getAddress().getFullName());
        address.setPhone(request.getAddress().getPhone());
        address.setCity(request.getAddress().getCity());
        address.setState(request.getAddress().getState());
        address.setPincode(request.getAddress().getPincode());
        address.setFullAddress(request.getAddress().getFullAddress());

        orderAddressRepository.save(address);

        // 🔗 ATTACH ADDRESS TO ORDER (IMPORTANT)
        savedOrder.setOrderAddress(address);

        // 6️⃣ CLEAR CART
        cartRepository.deleteByUserId(request.getUserId());

        return savedOrder;
    }

    // ✅ USER → VIEW MY ORDERS (WITH ITEMS + ADDRESS)
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
