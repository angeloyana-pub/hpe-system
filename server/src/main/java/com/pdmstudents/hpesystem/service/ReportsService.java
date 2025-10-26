package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.repository.OrderRepository;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ReportsService {
  private final OrderRepository orderRepo;

  public ReportsService(OrderRepository orderRepo) {
    this.orderRepo = orderRepo;
  }

  public List<Map<String, Object>> getSalesReport() {
    return orderRepo.getMonthlySales().stream()
        .map(
            row ->
                Map.of(
                    "month", row[0],
                    "totalSales", row[1]))
        .toList();
  }
}
