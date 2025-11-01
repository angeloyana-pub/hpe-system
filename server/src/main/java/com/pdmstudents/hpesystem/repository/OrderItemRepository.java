package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}
