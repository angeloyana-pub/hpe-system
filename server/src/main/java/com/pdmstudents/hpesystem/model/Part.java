package com.pdmstudents.hpesystem.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "parts")
@Getter
@Setter
@ToString
public class Part {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String size;
  private Integer stock;
  private Integer lowStockThreshold;

  @Column(precision = 10, scale = 2)
  private BigDecimal price;

  @ManyToMany
  @JoinTable(
      name = "parts_tags",
      joinColumns = @JoinColumn(name = "part_id"),
      inverseJoinColumns = @JoinColumn(name = "tag_id"))
  private List<Tag> tags;

  @PrePersist
  protected void onCreate() {
    if (lowStockThreshold == null) {
      lowStockThreshold = 5;
    }
  }
}
