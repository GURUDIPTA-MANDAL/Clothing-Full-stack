package com.clothstore.clothingbackend.controller;

import com.clothstore.clothingbackend.entity.Cart;
import com.clothstore.clothingbackend.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    //  ADD TO CART
    @Transactional
    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long userId,
                          @RequestParam Long productId,
                          @RequestParam int quantity) {

        return cartRepository.findByUserIdAndProductId(userId, productId)
                .map(existingCart -> {
                    //  Product already in cart
                    existingCart.setQuantity(existingCart.getQuantity() + quantity);
                    return cartRepository.save(existingCart);
                })
                .orElseGet(() -> {
                    //  Product not in cart
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    cart.setProductId(productId);
                    cart.setQuantity(quantity);
                    return cartRepository.save(cart);
                });
    }


    //  VIEW CART ITEMS BY USER
    @GetMapping("/{userId}")
    public List<Cart> getCartItems(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    //  DELETE SINGLE CART ITEM
    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }

    @Transactional
    @PutMapping("/{cartId}/quantity")
    public Cart updateQuantity(
            @PathVariable Long cartId,
            @RequestParam int quantity
    ) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        //  If quantity <= 0 → delete item
        if (quantity <= 0) {
            cartRepository.delete(cart);
            return null;
        }

        cart.setQuantity(quantity);
        return cartRepository.save(cart);
    }

}
