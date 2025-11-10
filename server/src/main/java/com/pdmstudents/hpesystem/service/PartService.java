package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.PartRepository;
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
public class PartService {
  private PartRepository repo;

  public PartService(PartRepository repo) {
    this.repo = repo;
  }

  public Page<Part> getParts(Long id, String name, List<Long> tagIds, int page, int perPage) {
    Pageable pageable = PageRequest.of(page - 1, perPage);
    return repo.getParts(
        id,
        name == null || name.isEmpty() ? null : name,
        tagIds == null || tagIds.isEmpty() ? null : tagIds,
        pageable);
  }

  public List<Part> getAllParts() {
    return repo.findAll();
  }

  public Part createPart(Part part) {
    return repo.save(part);
  }

  public Part updatePart(Long id, Part updatedPart) {
    return repo.findById(id)
        .map(
            part -> {
              if (updatedPart.getName() != null) {
                part.setName(updatedPart.getName());
              }
              if (updatedPart.getSize() != null) {
                part.setSize(updatedPart.getSize());
              }
              if (updatedPart.getLowStockThreshold() != null) {
                part.setLowStockThreshold(updatedPart.getLowStockThreshold());
              }
              if (updatedPart.getPrice() != null) {
                part.setPrice(updatedPart.getPrice());
              }
              if (updatedPart.getTags() != null) {
                part.setTags(updatedPart.getTags());
              }
              return repo.save(part);
            })
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  public void deletePart(Long id) {
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
