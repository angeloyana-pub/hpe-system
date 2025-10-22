package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PartRepository extends JpaRepository<Part, Long> {
  @Modifying
  @Query("UPDATE Part p SET p.stock = p.stock - :stock WHERE p.id = :id")
  int decreaseStock(@Param("id") Long id, @Param("stock") Integer stock);
}
