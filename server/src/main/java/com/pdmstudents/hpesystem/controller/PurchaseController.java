package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Purchase;
import com.pdmstudents.hpesystem.repository.PartRepository;
import com.pdmstudents.hpesystem.repository.PurchaseRepository;
import com.pdmstudents.hpesystem.repository.SupplierRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
  private final PurchaseRepository repo;
  private final SupplierRepository supplierRepo;
  private final PartRepository partRepo;

  public PurchaseController(
      PurchaseRepository repo, SupplierRepository supplierRepo, PartRepository partRepo) {
    this.repo = repo;
    this.supplierRepo = supplierRepo;
    this.partRepo = partRepo;
  }

  @GetMapping
  public ApiResponse<List<Purchase>> getPurchases() {
    return new ApiResponse<>(true, repo.findAll());
  }

  public ResponseEntity<ApiResponse<Purchase>> getPurchase(@PathVariable Long id) {
    return repo.findById(id)
        .map(purchase -> ResponseEntity.ok(new ApiResponse<>(true, purchase)))
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @PostMapping
  public ApiResponse<Purchase> createPurchase(@RequestBody Purchase purchase) {
    if (purchase.getSupplier() != null) {
      supplierRepo
          .findById(purchase.getSupplier().getId())
          .ifPresent(
              supplier -> {
                purchase.setSupplier(supplier);
              });
    }
    if (purchase.getPart() != null) {
      partRepo
          .findById(purchase.getPart().getId())
          .ifPresent(
              part -> {
                purchase.setPart(part);
                part.setStock(part.getStock() + purchase.getQuantity());
              });
    }
    Purchase savedPurchase = repo.save(purchase);
    return new ApiResponse<>(true, savedPurchase);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ApiResponse<Purchase>> updatePurchase(
      @PathVariable Long id, @RequestBody Purchase updatedPurchase) {
    return repo.findById(id)
        .map(
            purchase -> {
              if (updatedPurchase.getQuantity() != null) {
                purchase.setQuantity(updatedPurchase.getQuantity());
              }
              if (updatedPurchase.getPrice() != null) {
                purchase.setPrice(updatedPurchase.getPrice());
              }
              if (updatedPurchase.getSupplier() != null) {
                supplierRepo
                    .findById(updatedPurchase.getSupplier().getId())
                    .ifPresent(
                        supplier -> {
                          purchase.setSupplier(supplier);
                        });
              }
              if (updatedPurchase.getPart() != null) {
                partRepo
                    .findById(updatedPurchase.getPart().getId())
                    .ifPresent(
                        part -> {
                          purchase.setPart(part);
                        });
              }
              Purchase savedPurchase = repo.save(purchase);
              return ResponseEntity.ok(new ApiResponse<>(true, savedPurchase));
            })
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Object>> deletePurchase(@PathVariable Long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return ResponseEntity.ok(new ApiResponse<>(true, null));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null));
    }
  }
}
