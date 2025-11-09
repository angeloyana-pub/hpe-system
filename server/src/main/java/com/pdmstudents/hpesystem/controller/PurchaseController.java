package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Purchase;
import com.pdmstudents.hpesystem.service.PurchaseService;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
  private final PurchaseService service;

  public PurchaseController(PurchaseService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<Map<String, Object>> getPurchases(
      @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int perPage) {
    Page<Purchase> result = service.getPurchases(page, perPage);
    return new ApiResponse<>(
        200,
        Map.of(
            "purchases", result.getContent(),
            "pageCount", result.getTotalPages()));
  }

  @GetMapping("/{id}")
  public ApiResponse<Purchase> getPurchase(@PathVariable Long id) {
    Purchase purchase = service.getPurchase(id);
    return new ApiResponse<>(200, purchase);
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
