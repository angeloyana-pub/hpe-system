package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Order;
import com.pdmstudents.hpesystem.model.OrderItem;
import com.pdmstudents.hpesystem.repository.OrderRepository;
import com.pdmstudents.hpesystem.repository.PartRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {
  private final OrderRepository repo;
  private final PartRepository partRepo;

  public OrderService(OrderRepository repo, PartRepository partRepo) {
    this.repo = repo;
    this.partRepo = partRepo;
  }

  public Page<Order> getOrders(int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getOrders(pageable);
  }

  @Transactional
  public Order createOrder(Order order) {
    order.getOrderItems().forEach(orderItem -> orderItem.setOrder(order));
    Order savedOrder = repo.save(order);
    savedOrder
        .getOrderItems()
        .forEach(
            orderItem -> {
              // TODO: load part if needed
              partRepo.decreaseStock(orderItem.getPart().getId(), orderItem.getQuantity());
            });
    return savedOrder;
  }

  public Order updateOrder(Long id, Order updatedOrder) {
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
                // TODO: update the corresponding part's stock.
                List<OrderItem> orderItems = updatedOrder.getOrderItems();
                orderItems.forEach(orderItem -> orderItem.setOrder(order));
                order.setOrderItems(orderItems);
              }
              return repo.save(order);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public void deleteOrder(Long id) {
    repo.findById(id)
        .ifPresentOrElse(
            repo::delete,
            () -> {
              throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
  }
}
