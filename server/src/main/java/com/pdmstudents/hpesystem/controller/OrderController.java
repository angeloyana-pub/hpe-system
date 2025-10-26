package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Order;
import com.pdmstudents.hpesystem.service.OrderService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService service;

  public OrderController(OrderService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<List<Order>> getOrders() {
    List<Order> orders = service.getOrders();
    return new ApiResponse<>(200, orders);
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
