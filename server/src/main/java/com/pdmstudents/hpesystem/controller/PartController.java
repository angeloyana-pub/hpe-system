package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.service.PartService;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parts")
public class PartController {
  private final PartService service;

  public PartController(PartService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<Map<String, Object>> getParts(
      @RequestParam(required = false) Long id,
      @RequestParam(required = false) String name,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int perPage,
      @RequestParam(name = "tagIds", required = false) List<Long> tagIds) {
    Page<Part> result = service.getParts(id, name, tagIds, page, perPage);
    return new ApiResponse<>(
        200,
        Map.of(
            "parts", result.getContent(),
            "pageCount", result.getTotalPages()));
  }

  @GetMapping("/all")
  public ApiResponse<List<Part>> getAllParts() {
    List<Part> parts = service.getAllParts();
    return new ApiResponse<>(200, parts);
  }

  @PostMapping
  public ApiResponse<Part> createPart(@RequestBody Part part) {
    Part savedPart = service.createPart(part);
    return new ApiResponse<>(200, savedPart);
  }

  @PatchMapping("/{id}")
  public ApiResponse<Part> updatePart(@PathVariable Long id, @RequestBody Part updatedPart) {
    Part part = service.updatePart(id, updatedPart);
    return new ApiResponse<>(200, part);
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Object> deletePart(@PathVariable Long id) {
    service.deletePart(id);
    return new ApiResponse<>(200, null);
  }
}
