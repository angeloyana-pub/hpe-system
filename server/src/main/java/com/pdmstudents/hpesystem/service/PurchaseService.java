package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.enums.PurchaseStatus;
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
                        if (savedPurchase.getStatus() == PurchaseStatus.COMPLETED) {
                          part.setStock(part.getStock() + purchaseItem.getQuantity());
                        }
                      });
            });
    return savedPurchase;
  }

  @Transactional(rollbackFor = Exception.class)
  public Purchase updatePurchase(Long id, Purchase updatedPurchase) {
    return repo.findById(id)
        .map(
            purchase -> {
              var prevStatus = purchase.getStatus();
              var newStatus = updatedPurchase.getStatus();
              if (prevStatus == PurchaseStatus.COMPLETED) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
              }

              var newSupplier = updatedPurchase.getSupplier();
              if (newSupplier != null) {
                purchase.setSupplier(newSupplier);
              }

              var prevItems = purchase.getPurchaseItems();
              var newItems = updatedPurchase.getPurchaseItems();
              if (newItems != null) {
                for (var item : newItems) {
                  item.setPurchase(purchase);
                  partRepo.findById(item.getPart().getId()).ifPresent(item::setPart);
                }

                if (newStatus == PurchaseStatus.COMPLETED) {
                  for (var item : newItems) {
                    var part = item.getPart();
                    part.setStock(part.getStock() + item.getQuantity());
                  }
                }

                prevItems.clear();
                prevItems.addAll(newItems);
              } else {
                if (newStatus == PurchaseStatus.COMPLETED) {
                  for (var item : prevItems) {
                    var part = item.getPart();
                    part.setStock(part.getStock() + item.getQuantity());
                  }
                }
              }

              if (newStatus != null) {
                purchase.setStatus(newStatus);
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
