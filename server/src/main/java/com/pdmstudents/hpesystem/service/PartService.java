package com.pdmstudents.hpesystem.service;

import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.PartRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PartService {
  private PartRepository repo;

  public PartService(PartRepository repo) {
    this.repo = repo;
  }

  public List<Part> getParts() {
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
              if (updatedPart.getStock() != null) {
                part.setStock(updatedPart.getStock());
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
    repo.findById(id)
        .ifPresentOrElse(
            repo::delete,
            () -> {
              throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            });
  }
}
