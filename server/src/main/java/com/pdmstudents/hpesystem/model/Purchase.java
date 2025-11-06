package com.pdmstudents.hpesystem.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "purchases")
@Getter
@Setter
@ToString
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer quantity;

  @Column(precision = 10, scale = 2)
  private BigDecimal price;

  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "supplier_id")
  private Supplier supplier;

  @ManyToOne
  @JoinColumn(name = "part_id")
  private Part part;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
  }
}
