package com.pdmstudents.hpesystem.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "purchase_items")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@ToString
public class PurchaseItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int quantity;

  @Column(precision = 10, scale = 2)
  private BigDecimal price;

  @ManyToOne
  @JoinColumn(name = "part_id")
  private Part part;

  @ManyToOne
  @JoinColumn(name = "purchase_id")
  @ToString.Exclude
  private Purchase purchase;
}
