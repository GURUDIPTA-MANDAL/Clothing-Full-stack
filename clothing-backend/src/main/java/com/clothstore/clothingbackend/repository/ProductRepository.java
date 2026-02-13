package com.clothstore.clothingbackend.repository;

import com.clothstore.clothingbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
