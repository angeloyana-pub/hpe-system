package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Tag;
import com.pdmstudents.hpesystem.service.TagService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tags")
public class TagController {
  private final TagService service;

  public TagController(TagService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<List<Tag>> getTags() {
    List<Tag> tags = service.getTags();
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
