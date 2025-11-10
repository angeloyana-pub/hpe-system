package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.enums.OrderStatus;
import com.pdmstudents.hpesystem.model.Order;
import com.pdmstudents.hpesystem.repository.CustomerRepository;
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
  private final CustomerRepository customerRepo;

  public OrderService(
      OrderRepository repo, PartRepository partRepo, CustomerRepository customerRepo) {
    this.repo = repo;
    this.partRepo = partRepo;
    this.customerRepo = customerRepo;
  }

  public Page<Order> getOrders(Long id, List<String> status, int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getOrders(id, status, pageable);
  }

  public Order getOrder(Long id) {
    return repo.findById(id)
        .map(order -> order)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @Transactional(rollbackFor = Exception.class)
  public Order createOrder(Order order) {
    order.getOrderItems().forEach(orderItem -> orderItem.setOrder(order));
    Order savedOrder = repo.save(order);

    customerRepo
        .findById(order.getCustomer().getId())
        .ifPresent(
            customer -> {
              savedOrder.setCustomer(customer);
            });

    savedOrder
        .getOrderItems()
        .forEach(
            item -> {
              partRepo
                  .findById(item.getPart().getId())
                  .ifPresent(
                      (part) -> {
                        item.setPart(part);
                        if (savedOrder.getStatus() == OrderStatus.COMPLETED) {
                          Integer newStock = part.getStock() - item.getQuantity();
                          if (newStock < 0) {
                            throw new ResponseStatusException(HttpStatus.CONFLICT);
                          }
                          part.setStock(newStock);
                        }
                      });
            });
    return savedOrder;
  }

  @Transactional(rollbackFor = Exception.class)
  public Order updateOrder(Long id, Order updatedOrder) {
    return repo.findById(id)
        .map(
            order -> {
              var prevStatus = order.getStatus();
              var newStatus = updatedOrder.getStatus();
              if (prevStatus == OrderStatus.COMPLETED) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
              }

              var newCustomer = updatedOrder.getCustomer();
              if (newCustomer != null) {
                order.setCustomer(newCustomer);
              }

              var prevItems = order.getOrderItems();
              var newItems = updatedOrder.getOrderItems();
              if (newItems != null) {
                for (var item : newItems) {
                  item.setOrder(order);
                  partRepo.findById(item.getPart().getId()).ifPresent(item::setPart);
                }

                if (newStatus == OrderStatus.COMPLETED) {
                  for (var item : newItems) {
                    var part = item.getPart();
                    Integer newStock = part.getStock() - item.getQuantity();
                    if (newStock < 0) {
                      throw new ResponseStatusException(HttpStatus.CONFLICT);
                    }
                    part.setStock(newStock);
                  }
                }

                prevItems.clear();
                prevItems.addAll(newItems);
              } else {
                if (newStatus == OrderStatus.COMPLETED) {
                  for (var item : prevItems) {
                    var part = item.getPart();
                    Integer newStock = part.getStock() - item.getQuantity();
                    if (newStock < 0) {
                      throw new ResponseStatusException(HttpStatus.CONFLICT);
                    }
                    part.setStock(newStock);
                  }
                }
              }

              if (newStatus != null) {
                order.setStatus(newStatus);
              }

              return repo.save(order);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @Transactional(rollbackFor = Exception.class)
  public void deleteOrder(Long id) {
    repo.findById(id)
        .ifPresentOrElse(
            order -> {
              order
                  .getOrderItems()
                  .forEach(
                      item -> {
                        var part = item.getPart();
                        part.setStock(part.getStock() + item.getQuantity());
                      });
              repo.delete(order);
            },
            () -> {
              throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
  }
}
