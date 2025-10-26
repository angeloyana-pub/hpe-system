package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.OrderItemRepository;
import com.pdmstudents.hpesystem.repository.OrderRepository;
import com.pdmstudents.hpesystem.repository.PartRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  private final PartRepository partRepo;
  private final OrderItemRepository orderItemRepo;
  private final OrderRepository orderRepo;

  public DashboardController(
      PartRepository partRepo, OrderItemRepository orderItemRepo, OrderRepository orderRepo) {
    this.partRepo = partRepo;
    this.orderItemRepo = orderItemRepo;
    this.orderRepo = orderRepo;
  }

  @GetMapping("/low-stock-parts")
  public ApiResponse<List<Part>> getLowStockParts() {
    List<Part> parts =
        partRepo.getLowStockParts(5); // TODO: implement custom low stock threshold per parts.
    return new ApiResponse<>(true, parts);
  }

  @GetMapping("/total-sales")
  public ApiResponse<Map<String, Object>> getTotalRevenue() {
    BigDecimal totalSales = orderItemRepo.getTotalSales();
    return new ApiResponse<>(true, Map.of("totalSales", totalSales));
  }

  @GetMapping("/total-orders")
  public ApiResponse<Map<String, Object>> getTotalOrders() {
    int totalOrders = orderRepo.getTotalOrders();
    return new ApiResponse<>(true, Map.of("totalOrders", totalOrders));
  }
}
