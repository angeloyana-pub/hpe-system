package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<Tag, Long> {
  @Query(
      """
    SELECT t FROM Tag t
    WHERE (:id IS NULL OR t.id = :id)
      AND (:name IS NULL OR LOWER(t.name) LIKE LOWER(CONCAT('%', :name, '%')))
  """)
  Page<Tag> getTags(@Param("id") Long id, @Param("name") String name, Pageable pageable);
}
