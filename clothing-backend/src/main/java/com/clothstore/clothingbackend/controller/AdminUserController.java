package com.clothstore.clothingbackend.controller;

import com.clothstore.clothingbackend.entity.User;
import com.clothstore.clothingbackend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //  GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //  BLOCK USER
    @PutMapping("/{id}/block")
    public User blockUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBlocked(true);
        return userRepository.save(user);
    }

    //  UNBLOCK USER
    @PutMapping("/{id}/unblock")
    public User unblockUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBlocked(false);
        return userRepository.save(user);
    }
}
