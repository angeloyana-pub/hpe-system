package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Purchase;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
  @Query(
      """
    SELECT p FROM Purchase p
    WHERE (:id IS NULL OR p.id = :id)
      AND (:status IS NULL OR p.status IN :status)
  """)
  Page<Purchase> getPurchases(
      @Param("id") Long id, @Param("status") List<String> status, Pageable pageable);
}
