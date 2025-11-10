package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Order;
import com.pdmstudents.hpesystem.service.OrderService;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService service;

  public OrderController(OrderService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<Map<String, Object>> getOrders(
      @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int perPage) {
    Page<Order> result = service.getOrders(page, perPage);
    return new ApiResponse<>(
        200,
        Map.of(
            "orders", result.getContent(),
            "pageCount", result.getTotalPages()));
  }

  @GetMapping("/{id}")
  public ApiResponse<Order> getOrder(@PathVariable Long id) {
    Order order = service.getOrder(id);
    return new ApiResponse<>(200, order);
  }

  @PostMapping
  public ApiResponse<Order> createOrder(@RequestBody Order order) {
    Order savedOrder = service.createOrder(order);
    return new ApiResponse<>(200, savedOrder);
  }

  @PatchMapping("/{id}")
  public ApiResponse<Order> updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
    Order order = service.updateOrder(id, updatedOrder);
    return new ApiResponse<>(200, order);
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Object> deleteOrder(@PathVariable Long id) {
    service.deleteOrder(id);
    return new ApiResponse<>(200, null);
  }
}
