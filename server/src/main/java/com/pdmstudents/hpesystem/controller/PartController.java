package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.model.Part;
import com.pdmstudents.hpesystem.service.PartService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parts")
public class PartController {
  private final PartService service;

  public PartController(PartService service) {
    this.service = service;
  }

  @GetMapping
  public ApiResponse<List<Part>> getParts() {
    List<Part> parts = service.getParts();
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
