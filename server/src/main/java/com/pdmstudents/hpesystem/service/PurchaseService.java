package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Purchase;
import com.pdmstudents.hpesystem.repository.PartRepository;
import com.pdmstudents.hpesystem.repository.PurchaseRepository;
import com.pdmstudents.hpesystem.repository.SupplierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

  public Page<Purchase> getPurchases(int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getPurchases(pageable);
  }

  public Purchase getPurchase(Long id) {
    return repo.findById(id)
        .map(purchase -> purchase)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @Transactional(rollbackFor = Exception.class)
  public Purchase createPurchase(Purchase purchase) {
    purchase.getPurchaseItems().forEach(purchaseItem -> purchaseItem.setPurchase(purchase));
    Purchase savedPurchase = repo.save(purchase);

    supplierRepo
        .findById(savedPurchase.getSupplier().getId())
        .ifPresent(
            supplier -> {
              savedPurchase.setSupplier(supplier);
            });

    savedPurchase
        .getPurchaseItems()
        .forEach(
            purchaseItem -> {
              partRepo
                  .findById(purchaseItem.getPart().getId())
                  .ifPresent(
                      part -> {
                        purchaseItem.setPart(part);
                        part.setStock(part.getStock() + purchaseItem.getQuantity());
                      });
            });
    return savedPurchase;
  }

  @Transactional(rollbackFor = Exception.class)
  public Purchase updatePurchase(Long id, Purchase updatedPurchase) {
    return repo.findById(id)
        .map(
            purchase -> {
              if (updatedPurchase.getSupplier() != null) {
                supplierRepo
                    .findById(updatedPurchase.getSupplier().getId())
                    .ifPresent(supplier -> purchase.setSupplier(supplier));
              }

              var purchaseItems = updatedPurchase.getPurchaseItems();
              if (purchaseItems != null) {
                purchase
                    .getPurchaseItems()
                    .forEach(
                        (item) -> {
                          var part = item.getPart();
                          part.setStock(part.getStock() - item.getQuantity());
                        });
                purchaseItems.forEach(
                    item -> {
                      partRepo
                          .findById(item.getPart().getId())
                          .ifPresent(
                              part -> {
                                item.setPurchase(purchase);
                                part.setStock(part.getStock() + item.getQuantity());
                                partRepo.save(part);
                              });
                    });
                purchase.getPurchaseItems().clear();
                purchase.getPurchaseItems().addAll(purchaseItems);
              }

              return repo.save(purchase);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @Transactional(rollbackFor = Exception.class)
  public void deletePurchase(Long id) {
    repo.findById(id)
        .ifPresentOrElse(
            purchase -> {
              purchase
                  .getPurchaseItems()
                  .forEach(
                      (item) -> {
                        partRepo.decreaseStock(item.getPart().getId(), item.getQuantity());
                      });
              repo.delete(purchase);
            },
            () -> {
              throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
  }
}
