package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  @Query(
      """
    SELECT c FROM Customer c
    WHERE (:firstName IS NULL OR LOWER(c.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')))
      AND (:lastName IS NULL OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :lastName, '%')))
  """)
  Page<Customer> getCustomers(
      @Param("firstName") String firstName, @Param("lastName") String lastName, Pageable pageable);
}
