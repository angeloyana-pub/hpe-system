package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.User;
import com.pdmstudents.hpesystem.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository userRepo;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public AuthController(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  @PostMapping("/register")
  public ApiResponse<Object> register(@RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepo.save(user);
    return new ApiResponse<>(true, null);
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<Object>> login(
      @RequestBody User loginUser, HttpSession session) {
    Optional<User> user = userRepo.findByUsername(loginUser.getUsername());
    if (user.isPresent()
        && passwordEncoder.matches(loginUser.getPassword(), user.get().getPassword())) {
      session.setAttribute("userId", user.get().getId());
      return ResponseEntity.ok(new ApiResponse<>(true, null));
    }

    return ResponseEntity.badRequest().body(new ApiResponse<>(false, null));
  }

  @GetMapping("/me")
  public ResponseEntity<ApiResponse<User>> me(HttpSession session) {
    Long userId = (Long) session.getAttribute("userId");
    if (userId == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(false, null));

    Optional<User> user = userRepo.findById(userId);
    if (!user.isPresent()) {
      session.removeAttribute("userId");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(false, null));
    }

    return ResponseEntity.ok(new ApiResponse<>(true, user.get()));
  }
}
