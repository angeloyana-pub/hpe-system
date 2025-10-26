package com.pdmstudents.hpesystem.interceptor;

import com.pdmstudents.hpesystem.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
  private final AuthService service;

  public AuthInterceptor(AuthService service) {
    this.service = service;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    if (!Set.of("GET", "POST", "PUT", "PATCH", "DELETE").contains(request.getMethod())) return true;
    HttpSession session = request.getSession();

    Long userId = (Long) session.getAttribute("userId");
    if (userId == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    return service
        .getUser(userId)
        .map(
            user -> {
              request.setAttribute("user", user);
              return true;
            })
        .orElseThrow(
            () -> {
              session.removeAttribute("userId");
              return new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            });
  }
}
