package com.pdmstudents.hpesystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "purchases")
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer quantity;

  @ManyToOne
  @JoinColumn(name = "supplier_id")
  private Supplier supplier;

  @ManyToOne
  @JoinColumn(name = "part_id")
  private Part part;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Supplier getSupplier() {
    return supplier;
  }

  public void setSupplier(Supplier supplier) {
    this.supplier = supplier;
  }

  public Part getPart() {
    return part;
  }

  public void setPart(Part part) {
    this.part = part;
  }
}
