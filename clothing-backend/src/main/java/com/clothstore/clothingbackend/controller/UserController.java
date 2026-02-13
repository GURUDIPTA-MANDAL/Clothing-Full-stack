package com.clothstore.clothingbackend.controller;

import com.clothstore.clothingbackend.entity.User;
import com.clothstore.clothingbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ REGISTER USER
    @PostMapping(
            value = "/register",
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {


        Map<String, Object> response = new HashMap<>();

        // ✅ BASIC VALIDATION
        if (user.getUsername() == null || user.getUsername().isBlank()
                || user.getPassword() == null || user.getPassword().isBlank()
                || user.getEmail() == null || user.getEmail().isBlank()) {

            response.put("success", false);
            response.put("message", "All fields are required");
            return ResponseEntity.badRequest().body(response);
        }

        // ✅ CHECK DUPLICATE USERNAME
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return ResponseEntity.status(409).body(response);
        }

        // ✅ SAVE USER
        user.setBlocked(false);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Registration successful");
        return ResponseEntity.ok(response);
    }


    // ✅ LOGIN USER (WITH BLOCK CHECK)
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);

        Map<String, Object> response = new HashMap<>();

        // ❌ USER NOT FOUND OR PASSWORD WRONG
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return response;
        }

        User user = userOpt.get();

        // 🔴 BLOCK CHECK
        if (user.isBlocked()) {
            response.put("success", false);
            response.put("message", "Your account is blocked by admin");
            return response;
        }

        // ✅ LOGIN SUCCESS
        response.put("success", true);
        response.put("userId", user.getId());
        response.put("message", "Login successful");

        return response;
    }
}
