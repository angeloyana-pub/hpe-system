package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Tag;
import com.pdmstudents.hpesystem.service.TagService;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tags")
public class TagController {
  private final TagService service;

  public TagController(TagService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<Map<String, Object>> getTags(
      @RequestParam(required = false) Long id,
      @RequestParam(required = false) String name,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int perPage) {
    Page<Tag> result = service.getTags(id, name, page, perPage);
    return new ApiResponse<>(
        200,
        Map.of(
            "tags", result.getContent(),
            "pageCount", result.getTotalPages()));
  }

  @GetMapping("/all")
  public ApiResponse<List<Tag>> getAllTags() {
    List<Tag> tags = service.getAllTags();
    return new ApiResponse<>(200, tags);
  }

  @PostMapping
  public ApiResponse<Tag> createTag(@RequestBody Tag tag) {
    Tag savedTag = service.createTag(tag);
    return new ApiResponse<>(200, savedTag);
  }

  @PatchMapping("/{id}")
  public ApiResponse<Tag> updateTag(@PathVariable Long id, @RequestBody Tag updatedTag) {
    Tag tag = service.updateTag(id, updatedTag);
    return new ApiResponse<>(200, tag);
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Object> deleteTag(@PathVariable Long id) {
    service.deleteTag(id);
    return new ApiResponse<>(200, null);
  }
}
