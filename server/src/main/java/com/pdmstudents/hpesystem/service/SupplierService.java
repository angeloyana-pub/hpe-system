package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Supplier;
import com.pdmstudents.hpesystem.repository.SupplierRepository;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SupplierService {
  private SupplierRepository repo;

  public SupplierService(SupplierRepository repo) {
    this.repo = repo;
  }

  public Page<Supplier> getSuppliers(String name, int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getSuppliers(name, pageable);
  }

  public List<Supplier> getAllSuppliers() {
    return repo.findAll();
  }

  public Supplier createSupplier(Supplier supplier) {
    return repo.save(supplier);
  }

  public Supplier updateSupplier(Long id, Supplier updatedSupplier) {
    return repo.findById(id)
        .map(
            supplier -> {
              if (updatedSupplier.getName() != null) {
                supplier.setName(updatedSupplier.getName());
              }
              return repo.save(supplier);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public void deleteSupplier(Long id) {
    try {
      repo.findById(id)
          .ifPresentOrElse(
              repo::delete,
              () -> {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
              });
    } catch (DataIntegrityViolationException ex) {
      if (ex.getRootCause() instanceof SQLIntegrityConstraintViolationException) {
        throw new ResponseStatusException(HttpStatus.CONFLICT);
      } else {
        throw ex;
      }
    }
  }
}
