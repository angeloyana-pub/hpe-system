package com.pdmstudents.hpesystem.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.User;
import com.pdmstudents.hpesystem.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
  private final UserRepository userRepo;

  public AuthInterceptor(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    HttpSession session = request.getSession();

    ObjectMapper mapper = new ObjectMapper();
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Long userId = (Long) session.getAttribute("userId");
    if (userId == null) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write(mapper.writeValueAsString(new ApiResponse(false, null)));
      return false;
    }

    Optional<User> user = userRepo.findById(userId);
    if (user.get() == null) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      session.removeAttribute("userId");
      response.getWriter().write(mapper.writeValueAsString(new ApiResponse(false, null)));
      return false;
    }

    request.setAttribute("user", user.get());
    return true;
  }
}
