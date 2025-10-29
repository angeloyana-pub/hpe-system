package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Order;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query("SELECT o FROM Order o")
  Page<Order> getOrders(Pageable pageable);

  @Query("SELECT COUNT(o) FROM Order o")
  int getTotalOrders();

  @Query(
      value =
          """
    SELECT
      YEAR(o.created_at),
      MONTHNAME(o.created_at),
      COALESCE(SUM(oi.price * oi.quantity), 0)
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY YEAR(o.created_at), MONTH(o.created_at)
    ORDER BY YEAR(o.created_at), MONTH(o.created_at)
  """,
      nativeQuery = true)
  List<Object[]> getMonthlySales();

  @Query(
      value =
          """
    SELECT
      YEAR(o.created_at),
      COALESCE(SUM(oi.price * oi.quantity), 0)
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY YEAR(o.created_at)
    ORDER BY YEAR(o.created_at)
  """,
      nativeQuery = true)
  List<Object[]> getYearlySales();
}
