package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query("SELECT COUNT(o) FROM Order o")
  int getTotalOrders();
}
