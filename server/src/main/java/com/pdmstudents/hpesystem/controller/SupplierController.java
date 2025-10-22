package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Supplier;
import com.pdmstudents.hpesystem.repository.SupplierRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
  private final SupplierRepository repo;

  public SupplierController(SupplierRepository repo) {
    this.repo = repo;
  }

  @GetMapping
  public ApiResponse<List<Supplier>> getSuppliers() {
    return new ApiResponse<>(true, repo.findAll());
  }

  public ResponseEntity<ApiResponse<Supplier>> getSupplier(@PathVariable Long id) {
    return repo.findById(id)
        .map(supplier -> ResponseEntity.ok(new ApiResponse<>(true, supplier)))
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @PostMapping
  public ApiResponse<Supplier> createSupplier(@RequestBody Supplier supplier) {
    return new ApiResponse<>(true, repo.save(supplier));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ApiResponse<Supplier>> updateSupplier(
      @PathVariable Long id, @RequestBody Supplier updatedSupplier) {
    return repo.findById(id)
        .map(
            supplier -> {
              if (updatedSupplier.getName() != null) {
                supplier.setName(updatedSupplier.getName());
              }
              Supplier savedSupplier = repo.save(supplier);
              return ResponseEntity.ok(new ApiResponse<>(true, savedSupplier));
            })
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Object>> deleteSupplier(@PathVariable Long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return ResponseEntity.ok(new ApiResponse<>(true, null));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null));
    }
  }
}
