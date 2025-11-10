package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
  @Query(
      """
    SELECT s FROM Supplier s
    WHERE (:id IS NULL OR s.id = :id)
      AND (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')))
  """)
  Page<Supplier> getSuppliers(@Param("id") Long id, @Param("name") String name, Pageable pageable);
}
