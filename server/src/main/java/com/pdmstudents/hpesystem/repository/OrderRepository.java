package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query("SELECT COUNT(o) FROM Order o")
  int getTotalOrders();

  @Query(
      value =
          """
    SELECT
      DATE_FORMAT(o.created_at, '%M') AS month,
      COALESCE(SUM(oi.quantity * oi.price), 0)
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY month
    ORDER BY o.created_at ASC
  """,
      nativeQuery = true)
  List<Object[]> getMonthlySales();
}
