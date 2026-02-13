package com.clothstore.clothingbackend.controller;

import com.clothstore.clothingbackend.entity.Product;
import com.clothstore.clothingbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "*")
public class AdminProductController {

    @Autowired
    private ProductRepository productRepository;

    //  ADD PRODUCT (ADMIN)
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    //  VIEW ALL PRODUCTS (ADMIN)
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //  DELETE PRODUCT (ADMIN)
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
