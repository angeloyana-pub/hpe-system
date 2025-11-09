package com.pdmstudents.hpesystem.repository;

import com.pdmstudents.hpesystem.model.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {}
