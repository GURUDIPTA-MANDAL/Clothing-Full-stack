package com.clothstore.clothingbackend.repository;

import com.clothstore.clothingbackend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // ✅ Get all cart items for a user
    List<Cart> findByUserId(Long userId);

    // 🔥 REQUIRED FOR QUANTITY INCREASE
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);

    // ✅ Clear cart after order
    @Transactional
    void deleteByUserId(Long userId);
}
