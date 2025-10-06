package com.lms.controller;

import com.lms.entity.User;
import com.lms.repository.UserRepository;
import com.lms.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        try {
            String name = request.get("name");
            String email = request.get("email");
            String password = request.get("password");
            String role = request.get("role");

            if (userRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
            }

            User user = new User(name, email, passwordEncoder.encode(password), 
                               User.Role.valueOf(role.toUpperCase()));
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String role = request.get("role");

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
            }

            User user = userOpt.get();
            
            // Validate role matches
            if (!user.getRole().toString().equalsIgnoreCase(role)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid role selected"));
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole().toString()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Login failed: " + e.getMessage()));
        }
    }
}