package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.service.DashboardService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  private final DashboardService service;

  public DashboardController(DashboardService service) {
    this.service = service;
  }

  @GetMapping("/low-stock-parts")
  public ApiResponse<List<Part>> getLowStockParts() {
    List<Part> parts = service.getLowStockParts();
    return new ApiResponse<>(200, parts);
  }

  @GetMapping("/total-sales")
  public ApiResponse<Map<String, BigDecimal>> getTotalRevenue() {
    var totalSales = service.getTotalSales();
    return new ApiResponse<>(200, totalSales);
  }

  @GetMapping("/total-orders")
  public ApiResponse<Map<String, Integer>> getTotalOrders() {
    var totalOrders = service.getTotalOrders();
    return new ApiResponse<>(200, totalOrders);
  }
}
