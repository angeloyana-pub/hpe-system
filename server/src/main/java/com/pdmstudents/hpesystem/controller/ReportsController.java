package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.repository.OrderRepository;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {
  private final OrderRepository orderRepo;

  public ReportsController(OrderRepository orderRepo) {
    this.orderRepo = orderRepo;
  }

  @GetMapping("/sales")
  public ApiResponse<List<Map<String, Object>>> getSalesReport() {
    List<Map<String, Object>> salesReport =
        orderRepo.getMonthlySales().stream()
            .map(
                row ->
                    Map.of(
                        "month", row[0],
                        "totalSales", row[1]))
            .toList();
    return new ApiResponse<>(true, salesReport);
  }
}
