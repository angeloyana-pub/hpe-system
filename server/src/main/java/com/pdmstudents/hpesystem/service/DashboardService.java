package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.OrderItemRepository;
import com.pdmstudents.hpesystem.repository.OrderRepository;
import com.pdmstudents.hpesystem.repository.PartRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
  private final PartRepository partRepo;
  private final OrderItemRepository orderItemRepo;
  private final OrderRepository orderRepo;

  public DashboardService(
      PartRepository partRepo, OrderItemRepository orderItemRepo, OrderRepository orderRepo) {
    this.partRepo = partRepo;
    this.orderItemRepo = orderItemRepo;
    this.orderRepo = orderRepo;
  }

  public List<Part> getLowStockParts() {
    return partRepo.getLowStockParts(5); // TODO: implement custom low stock threshold per parts.
  }

  public BigDecimal getTotalSales() {
    return orderItemRepo.getTotalSales();
  }

  public int getTotalOrders() {
    return orderRepo.getTotalOrders();
  }
}
