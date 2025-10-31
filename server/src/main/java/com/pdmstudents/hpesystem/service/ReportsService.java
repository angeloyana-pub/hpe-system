package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.repository.OrderRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ReportsService {
  private final OrderRepository orderRepo;

  public ReportsService(OrderRepository orderRepo) {
    this.orderRepo = orderRepo;
  }

  public List<Map<String, Object>> getSalesReport(
      LocalDateTime from, LocalDateTime to, String interval) {
    List<Object[]> salesReport =
        switch (interval) {
          case "year" -> orderRepo.getYearlySales(from, to);
          default -> orderRepo.getMonthlySales(from, to);
        };

    return salesReport.stream()
        .map(
            row ->
                switch (interval) {
                  case "year" ->
                      Map.of(
                          "year", row[0],
                          "totalSales", row[1]);
                  default ->
                      Map.of(
                          "year", row[0],
                          "month", row[1],
                          "totalSales", row[2]);
                })
        .toList();
  }
}
