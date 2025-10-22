package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Tag;
import com.pdmstudents.hpesystem.repository.TagRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tags")
public class TagController {
  private final TagRepository repo;

  public TagController(TagRepository repo) {
    this.repo = repo;
  }

  @GetMapping
  public ApiResponse<List<Tag>> getTags() {
    return new ApiResponse<>(true, repo.findAll());
  }

  public ResponseEntity<ApiResponse<Tag>> getTag(@PathVariable Long id) {
    return repo.findById(id)
        .map(tag -> ResponseEntity.ok(new ApiResponse<>(true, tag)))
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @PostMapping
  public ApiResponse<Tag> createTag(@RequestBody Tag tag) {
    return new ApiResponse<>(true, repo.save(tag));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ApiResponse<Tag>> updateTag(
      @PathVariable Long id, @RequestBody Tag updatedTag) {
    return repo.findById(id)
        .map(
            tag -> {
              if (updatedTag.getName() != null) {
                tag.setName(updatedTag.getName());
              }
              Tag savedTag = repo.save(tag);
              return ResponseEntity.ok(new ApiResponse<>(true, savedTag));
            })
        .orElseGet(
            () -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null)));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Object>> deleteTag(@PathVariable Long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return ResponseEntity.ok(new ApiResponse<>(true, null));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, null));
    }
  }
}
