package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Purchase;
import com.pdmstudents.hpesystem.service.PurchaseService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
  private final PurchaseService service;

  public PurchaseController(PurchaseService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<List<Purchase>> getPurchases() {
    List<Purchase> purchases = service.getPurchases();
    return new ApiResponse<>(200, purchases);
  }

  @PostMapping
  public ApiResponse<Purchase> createPurchase(@RequestBody Purchase purchase) {
    Purchase savedPurchase = service.createPurchase(purchase);
    return new ApiResponse<>(200, savedPurchase);
  }

  @PatchMapping("/{id}")
  public ApiResponse<Purchase> updatePurchase(
      @PathVariable Long id, @RequestBody Purchase updatedPurchase) {
    Purchase purchase = service.updatePurchase(id, updatedPurchase);
    return new ApiResponse<>(200, purchase);
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Object> deletePurchase(@PathVariable Long id) {
    service.deletePurchase(id);
    return new ApiResponse<>(200, null);
  }
}
