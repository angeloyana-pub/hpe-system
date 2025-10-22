package com.pdmstudents.hpesystem.config;

import com.pdmstudents.hpesystem.interceptor.AuthInterceptor;
import com.pdmstudents.hpesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AuthWebConfig implements WebMvcConfigurer {
  private final UserRepository userRepo;

  @Autowired
  public AuthWebConfig(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // NOTE: disabled route authenticator for development.
    // registry
    //     .addInterceptor(new AuthInterceptor(userRepo))
    //     .addPathPatterns("/api/**")
    //     .excludePathPatterns("/api/auth/login", "/api/auth/register");
  }
}
