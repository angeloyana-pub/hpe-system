package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Supplier;
import com.pdmstudents.hpesystem.service.SupplierService;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
  private final SupplierService service;

  public SupplierController(SupplierService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<Map<String, Object>> getSuppliers(
      @RequestParam(required = false) Long id,
      @RequestParam(required = false) String name,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int perPage) {
    Page<Supplier> result = service.getSuppliers(id, name, page, perPage);
    return new ApiResponse<>(
        200,
        Map.of(
            "suppliers", result.getContent(),
            "pageCount", result.getTotalPages()));
  }

  @GetMapping("/all")
  public ApiResponse<List<Supplier>> getAllSuppliers() {
    List<Supplier> suppliers = service.getAllSuppliers();
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

  @DeleteMapping
  public ApiResponse<Object> deleteSuppliers(@RequestParam List<Long> ids) {
    service.deleteSuppliers(ids);
    return new ApiResponse<>(200, null);
  }
}
