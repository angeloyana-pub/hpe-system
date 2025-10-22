package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.repository.PartRepository;
import com.pdmstudents.hpesystem.repository.TagRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parts")
public class PartController {
  private final PartRepository repo;
  private final TagRepository tagRepo;

  public PartController(PartRepository repo, TagRepository tagRepo) {
    this.repo = repo;
    this.tagRepo = tagRepo;
  }

  @GetMapping
  public ApiResponse<List<Part>> getParts() {
    return new ApiResponse<>(true, repo.findAll());
  }

  public ResponseEntity<ApiResponse<Part>> getPart(@PathVariable Long id) {
    return repo.findById(id)
        .map(part -> ResponseEntity.ok(new ApiResponse<>(true, part)))
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @PostMapping
  public ApiResponse<Part> createPart(@RequestBody Part part) {
    Part savedPart = repo.save(part);
    return new ApiResponse<>(true, savedPart);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ApiResponse<Part>> updatePart(
      @PathVariable Long id, @RequestBody Part updatedPart) {
    return repo.findById(id)
        .map(
            part -> {
              if (updatedPart.getName() != null) {
                part.setName(updatedPart.getName());
              }
              if (updatedPart.getSize() != null) {
                part.setSize(updatedPart.getSize());
              }
              if (updatedPart.getPrice() != null) {
                part.setPrice(updatedPart.getPrice());
              }
              if (updatedPart.getTags() != null) {
                part.setTags(updatedPart.getTags());
              }
              Part savedPart = repo.save(part);
              return ResponseEntity.ok(new ApiResponse<>(true, savedPart));
            })
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Object>> deletePart(@PathVariable Long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return ResponseEntity.ok(new ApiResponse<>(true, null));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null));
    }
  }
}
