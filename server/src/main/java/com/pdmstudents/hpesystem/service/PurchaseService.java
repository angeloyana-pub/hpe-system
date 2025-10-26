package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Purchase;
import com.pdmstudents.hpesystem.repository.PartRepository;
import com.pdmstudents.hpesystem.repository.PurchaseRepository;
import com.pdmstudents.hpesystem.repository.SupplierRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PurchaseService {
  private final PurchaseRepository repo;
  private final SupplierRepository supplierRepo;
  private final PartRepository partRepo;

  public PurchaseService(
      PurchaseRepository repo, SupplierRepository supplierRepo, PartRepository partRepo) {
    this.repo = repo;
    this.supplierRepo = supplierRepo;
    this.partRepo = partRepo;
  }

  public List<Purchase> getPurchases() {
    return repo.findAll();
  }

  public Purchase createPurchase(Purchase purchase) {
    if (purchase.getSupplier() != null) {
      supplierRepo
          .findById(purchase.getSupplier().getId())
          .ifPresent(
              supplier -> {
                purchase.setSupplier(supplier);
              });
    }
    if (purchase.getPart() != null) {
      partRepo
          .findById(purchase.getPart().getId())
          .ifPresent(
              part -> {
                purchase.setPart(part);
                part.setStock(part.getStock() + purchase.getQuantity());
              });
    }
    return repo.save(purchase);
  }

  public Purchase updatePurchase(Long id, Purchase updatedPurchase) {
    return repo.findById(id)
        .map(
            purchase -> {
              if (updatedPurchase.getQuantity() != null) {
                purchase.setQuantity(updatedPurchase.getQuantity());
              }
              if (updatedPurchase.getPrice() != null) {
                purchase.setPrice(updatedPurchase.getPrice());
              }
              if (updatedPurchase.getSupplier() != null) {
                supplierRepo
                    .findById(updatedPurchase.getSupplier().getId())
                    .ifPresent(
                        supplier -> {
                          purchase.setSupplier(supplier);
                        });
              }
              if (updatedPurchase.getPart() != null) {
                partRepo
                    .findById(updatedPurchase.getPart().getId())
                    .ifPresent(
                        part -> {
                          purchase.setPart(part);
                        });
              }
              return repo.save(purchase);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public void deletePurchase(Long id) {
    repo.findById(id)
        .ifPresentOrElse(
            repo::delete,
            () -> {
              throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
  }
}
