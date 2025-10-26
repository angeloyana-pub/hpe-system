package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.User;
import com.pdmstudents.hpesystem.repository.UserRepository;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
  private final UserRepository userRepo;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public AuthService(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  public User login(String username, String password) {
    if (username.isEmpty() || password.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    Optional<User> user = userRepo.findByUsername(username);
    if (!user.isPresent() || !passwordEncoder.matches(password, user.get().getPassword())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    return user.get();
  }

  public Optional<User> getUser(Long id) {
    return userRepo.findById(id);
  }
}
