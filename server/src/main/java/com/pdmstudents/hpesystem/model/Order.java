package com.pdmstudents.hpesystem.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.pdmstudents.hpesystem.enums.OrderStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orders")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@ToString
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(precision = 10, scale = 2)
  private BigDecimal paymentAmount;

  private String paymentMethod;
  private LocalDateTime createdAt;
  private LocalDateTime completedAt;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;

  @OneToMany(
      mappedBy = "order",
      cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE},
      orphanRemoval = true)
  private List<OrderItem> orderItems;

  @PrePersist
  protected void onCreate() {
    if (createdAt == null) {
      createdAt = LocalDateTime.now();
    }
    if (status == OrderStatus.COMPLETED) {
      completedAt = LocalDateTime.now();
    }
  }

  @PreUpdate
  protected void onUpdate() {
    if (status == OrderStatus.COMPLETED && completedAt == null) {
      completedAt = LocalDateTime.now();
    }
  }

  public BigDecimal getTotal() {
    return orderItems != null
        ? orderItems.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add)
        : BigDecimal.ZERO;
  }
}
