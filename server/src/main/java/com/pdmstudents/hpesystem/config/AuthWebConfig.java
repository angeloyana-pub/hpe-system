package com.pdmstudents.hpesystem.config;

import com.pdmstudents.hpesystem.interceptor.AuthInterceptor;
import com.pdmstudents.hpesystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AuthWebConfig implements WebMvcConfigurer {
  private final AuthService service;

  @Autowired
  public AuthWebConfig(AuthService service) {
    this.service = service;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry
        .addInterceptor(new AuthInterceptor(service))
        .addPathPatterns("/api/**")
        .excludePathPatterns("/api/auth/login");
  }
}
