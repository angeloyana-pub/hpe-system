package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.User;
import com.pdmstudents.hpesystem.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService service;

  public AuthController(AuthService service) {
    this.service = service;
  }

  @PostMapping("/login")
  public ApiResponse<Object> login(@RequestBody User loginUser, HttpSession session) {
    User user = service.login(loginUser.getUsername(), loginUser.getPassword());
    session.setAttribute("userId", user.getId());
    return new ApiResponse<>(200, null);
  }

  @PostMapping("/logout")
  public ApiResponse<Object> logout(HttpSession session) {
    session.removeAttribute("userId");
    return new ApiResponse<>(200, null);
  }

  @GetMapping("/me")
  public ApiResponse<User> me(HttpServletRequest request) {
    return new ApiResponse<>(200, (User) request.getAttribute("user"));
  }
}
