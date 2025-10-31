package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Order;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    WHERE (:from IS NULL OR o.created_at >= :from)
      AND (:to IS NULL OR o.created_at <= :to)
    GROUP BY YEAR(o.created_at), MONTH(o.created_at)
    ORDER BY YEAR(o.created_at), MONTH(o.created_at)
  """,
      nativeQuery = true)
  List<Object[]> getMonthlySales(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

  @Query(
      value =
          """
    SELECT
      YEAR(o.created_at),
      COALESCE(SUM(oi.price * oi.quantity), 0)
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE (:from IS NULL OR o.created_at >= :from)
      AND (:to IS NULL OR o.created_at <= :to)
    GROUP BY YEAR(o.created_at)
    ORDER BY YEAR(o.created_at)
  """,
      nativeQuery = true)
  List<Object[]> getYearlySales(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
}
