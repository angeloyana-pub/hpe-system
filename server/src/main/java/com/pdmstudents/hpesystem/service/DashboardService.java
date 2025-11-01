package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.OrderRepository;
import com.pdmstudents.hpesystem.repository.PartRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
  private final PartRepository partRepo;
  private final OrderRepository orderRepo;

  public DashboardService(PartRepository partRepo, OrderRepository orderRepo) {
    this.partRepo = partRepo;
    this.orderRepo = orderRepo;
  }

  public List<Part> getLowStockParts() {
    return partRepo.getLowStockParts();
  }

  public Map<String, BigDecimal> getTotalSales() {
    BigDecimal[] totalSales = orderRepo.getTotalSales().get(0);
    return Map.of(
        "currentTotalSales", totalSales[0],
        "previousTotalSales", totalSales[1]);
  }

  public Map<String, Integer> getTotalOrders() {
    Integer[] totalOrders = orderRepo.getTotalOrders().get(0);
    return Map.of(
        "currentTotalOrders", totalOrders[0],
        "previousTotalOrders", totalOrders[1]);
  }
}
