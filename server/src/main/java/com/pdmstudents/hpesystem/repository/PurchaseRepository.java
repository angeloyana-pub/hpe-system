package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
  @Query("SELECT p FROM Purchase p")
  Page<Purchase> getPurchases(Pageable pageable);
}
