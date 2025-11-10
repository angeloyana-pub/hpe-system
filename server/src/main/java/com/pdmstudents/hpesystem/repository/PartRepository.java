package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Part;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PartRepository extends JpaRepository<Part, Long> {
  @Query(
      """
    SELECT DISTINCT p FROM Part p
    LEFT JOIN p.tags t
    WHERE (:id IS NULL OR p.id = :id)
      AND (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))
      AND (:tagIds IS NULL OR t.id IN :tagIds)
  """)
  Page<Part> getParts(
      @Param("id") Long id,
      @Param("name") String name,
      @Param("tagIds") List<Long> tagIds,
      Pageable pageable);

  @Modifying
  @Query("UPDATE Part p SET p.stock = p.stock - :stock WHERE p.id = :id")
  int decreaseStock(@Param("id") Long id, @Param("stock") Integer stock);

  @Query("SELECT p from Part p WHERE p.stock <= p.lowStockThreshold ORDER BY p.stock ASC LIMIT 10")
  List<Part> getLowStockParts();
}
