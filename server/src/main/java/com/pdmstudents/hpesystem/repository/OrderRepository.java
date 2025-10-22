package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}
