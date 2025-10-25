package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.OrderItem;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
  @Query("SELECT COALESCE(SUM(oi.quantity * oi.price), 0) FROM OrderItem oi")
  BigDecimal getTotalRevenue();

  @Query("SELECT COALESCE(SUM(oi.quantity), 0) FROM OrderItem oi")
  int getTotalSales();
}
