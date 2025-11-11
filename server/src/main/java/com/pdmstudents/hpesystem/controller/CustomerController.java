package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Customer;
import com.pdmstudents.hpesystem.service.CustomerService;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
  private final CustomerService service;

  public CustomerController(CustomerService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<Map<String, Object>> getCustomers(
      @RequestParam(required = false) Long id,
      @RequestParam(required = false) String firstName,
      @RequestParam(required = false) String lastName,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int perPage) {
    Page<Customer> result = service.getCustomers(id, firstName, lastName, page, perPage);
    return new ApiResponse<>(
        200,
        Map.of(
            "customers", result.getContent(),
            "pageCount", result.getTotalPages()));
  }

  @GetMapping("/all")
  public ApiResponse<List<Customer>> getAllCustomers() {
    List<Customer> customers = service.getAllCustomers();
    return new ApiResponse<>(200, customers);
  }

  @PostMapping
  public ApiResponse<Customer> createCustomer(@RequestBody Customer customer) {
    Customer savedCustomer = service.createCustomer(customer);
    return new ApiResponse<>(200, savedCustomer);
  }

  @PatchMapping("/{id}")
  public ApiResponse<Customer> updateCustomer(
      @PathVariable Long id, @RequestBody Customer updatedCustomer) {
    Customer customer = service.updateCustomer(id, updatedCustomer);
    return new ApiResponse<>(200, customer);
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Object> deleteCustomer(@PathVariable Long id) {
    service.deleteCustomer(id);
    return new ApiResponse<>(200, null);
  }

  @DeleteMapping
  public ApiResponse<Object> deleteCustomers(@RequestParam List<Long> ids) {
    service.deleteCustomers(ids);
    return new ApiResponse<>(200, null);
  }
}
