package com.pdmstudents.hpesystem.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.pdmstudents.hpesystem.enums.PurchaseStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "purchases")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@ToString
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDateTime createdAt;
  private LocalDateTime completedAt;

  @Enumerated(EnumType.STRING)
  private PurchaseStatus status;

  @ManyToOne
  @JoinColumn(name = "supplier_id")
  private Supplier supplier;

  @OneToMany(
      mappedBy = "purchase",
      cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE},
      orphanRemoval = true)
  private List<PurchaseItem> purchaseItems;

  @PrePersist
  protected void onCreate() {
    if (createdAt == null) {
      createdAt = LocalDateTime.now();
    }
    if (status == PurchaseStatus.COMPLETED) {
      completedAt = LocalDateTime.now();
    }
  }

  @PreUpdate
  protected void onUpdate() {
    if (status == PurchaseStatus.COMPLETED && completedAt == null) {
      completedAt = LocalDateTime.now();
    }
  }

  public BigDecimal getTotal() {
    return purchaseItems != null
        ? purchaseItems.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add)
        : BigDecimal.ZERO;
  }
}
