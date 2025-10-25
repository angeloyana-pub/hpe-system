package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.OrderItemRepository;
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

  public DashboardController(PartRepository partRepo, OrderItemRepository orderItemRepo) {
    this.partRepo = partRepo;
    this.orderItemRepo = orderItemRepo;
  }

  @GetMapping("/low-stock-parts")
  public ApiResponse<List<Part>> getLowStockParts() {
    List<Part> parts =
        partRepo.getLowStockParts(5); // TODO: implement custom low stock threshold per parts.
    return new ApiResponse<>(true, parts);
  }

  @GetMapping("/total-revenue")
  public ApiResponse<Map<String, Object>> getTotalRevenue() {
    BigDecimal totalRevenue = orderItemRepo.getTotalRevenue();
    return new ApiResponse<>(true, Map.of("totalRevenue", totalRevenue));
  }

  @GetMapping("/total-sales")
  public ApiResponse<Map<String, Object>> getTotalSales() {
    int totalSales = orderItemRepo.getTotalSales();
    return new ApiResponse<>(true, Map.of("totalSales", totalSales));
  }
}
