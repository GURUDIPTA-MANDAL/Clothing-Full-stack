package com.clothstore.clothingbackend.repository;

import com.clothstore.clothingbackend.entity.OrderAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderAddressRepository extends JpaRepository<OrderAddress, Long> {
    // No extra method needed now
}
