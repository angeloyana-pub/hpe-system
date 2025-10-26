package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Supplier;
import com.pdmstudents.hpesystem.service.SupplierService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
  private final SupplierService service;

  public SupplierController(SupplierService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<List<Supplier>> getSuppliers() {
    List<Supplier> suppliers = service.getSuppliers();
    return new ApiResponse<>(200, suppliers);
  }

  @PostMapping
  public ApiResponse<Supplier> createSupplier(@RequestBody Supplier supplier) {
    Supplier savedSupplier = service.createSupplier(supplier);
    return new ApiResponse<>(200, savedSupplier);
  }

  @PatchMapping("/{id}")
  public ApiResponse<Supplier> updateSupplier(
      @PathVariable Long id, @RequestBody Supplier updatedSupplier) {
    Supplier supplier = service.updateSupplier(id, updatedSupplier);
    return new ApiResponse<>(200, supplier);
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Object> deleteSupplier(@PathVariable Long id) {
    service.deleteSupplier(id);
    return new ApiResponse<>(200, null);
  }
}
