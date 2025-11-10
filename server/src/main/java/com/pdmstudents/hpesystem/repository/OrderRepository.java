package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Order;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query(
      """
    SELECT o FROM Order o
    WHERE (:id IS NULL OR o.id = :id)
      AND (:status IS NULL OR o.status IN :status)
  """)
  Page<Order> getOrders(
      @Param("id") Long id, @Param("status") List<String> status, Pageable pageable);

  @Query(
      value =
          """
    SELECT
      YEAR(o.created_at),
      MONTHNAME(o.created_at),
      COALESCE(SUM(oi.price * oi.quantity), 0)
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE o.status = 'COMPLETED'
      AND (:from IS NULL OR o.created_at >= :from)
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
    WHERE o.status = 'COMPLETED'
      AND (:from IS NULL OR o.created_at >= :from)
      AND (:to IS NULL OR o.created_at <= :to)
    GROUP BY YEAR(o.created_at)
    ORDER BY YEAR(o.created_at)
  """,
      nativeQuery = true)
  List<Object[]> getYearlySales(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

  @Query(
      value =
          """
    SELECT
      SUM(
        CASE WHEN DATE_FORMAT(o.created_at, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m')
          THEN COALESCE(oi.price * oi.quantity, 0)
          ELSE 0
        END
      ) AS current_total_sales,
      SUM(
        CASE WHEN DATE_FORMAT(o.created_at, '%Y-%m') = DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), '%Y-%m')
          THEN COALESCE(oi.price * oi.quantity, 0)
          ELSE 0
        END
      ) AS previous_total_sales
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE o.status = 'COMPLETED'
  """,
      nativeQuery = true)
  List<BigDecimal[]> getTotalSales();

  @Query(
      value =
          """
    SELECT
      SUM(
        IF(DATE_FORMAT(o.created_at, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m'), 1, 0)
      ) AS current_total_orders,
      SUM(
        IF(DATE_FORMAT(o.created_at, '%Y-%m') = DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), '%Y-%m'), 1, 0)
      ) AS previous_total_orders
    FROM orders o
  """,
      nativeQuery = true)
  List<Integer[]> getTotalOrders();
}
