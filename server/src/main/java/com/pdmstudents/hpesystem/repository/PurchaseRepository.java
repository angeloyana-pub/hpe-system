package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {}
