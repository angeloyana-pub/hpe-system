package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Order;
import com.pdmstudents.hpesystem.model.OrderItem;
import com.pdmstudents.hpesystem.repository.OrderRepository;
import com.pdmstudents.hpesystem.repository.PartRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderRepository repo;
  private final PartRepository partRepo;

  public OrderController(OrderRepository repo, PartRepository partRepo) {
    this.repo = repo;
    this.partRepo = partRepo;
  }

  @GetMapping
  public ApiResponse<List<Order>> getOrders() {
    return new ApiResponse<>(true, repo.findAll());
  }

  public ResponseEntity<ApiResponse<Order>> getOrder(@PathVariable Long id) {
    return repo.findById(id)
        .map(order -> ResponseEntity.ok(new ApiResponse<>(true, order)))
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @Transactional
  @PostMapping
  public ApiResponse<Order> createOrder(@RequestBody Order order) {
    order.getOrderItems().forEach(orderItem -> orderItem.setOrder(order));
    Order savedOrder = repo.save(order);
    savedOrder
        .getOrderItems()
        .forEach(
            orderItem -> {
              // TODO: load part if needed
              partRepo.decreaseStock(orderItem.getPart().getId(), orderItem.getQuantity());
            });
    return new ApiResponse<>(true, savedOrder);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ApiResponse<Order>> updateOrder(
      @PathVariable Long id, @RequestBody Order updatedOrder) {
    return repo.findById(id)
        .map(
            order -> {
              if (updatedOrder.getPaymentAmount() != null) {
                order.setPaymentAmount(updatedOrder.getPaymentAmount());
              }
              if (updatedOrder.getPaymentMethod() != null) {
                order.setPaymentMethod(updatedOrder.getPaymentMethod());
              }
              if (updatedOrder.getOrderItems() != null) {
                List<OrderItem> orderItems = updatedOrder.getOrderItems();
                orderItems.forEach(orderItem -> orderItem.setOrder(order));
                order.setOrderItems(orderItems);
              }
              Order savedOrder = repo.save(order);
              return ResponseEntity.ok(new ApiResponse<>(true, savedOrder));
            })
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Object>> deleteOrder(@PathVariable Long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return ResponseEntity.ok(new ApiResponse<>(true, null));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null));
    }
  }
}
