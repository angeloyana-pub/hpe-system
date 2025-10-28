package com.pdmstudents.hpesystem.controller;

import com.pdmstudents.hpesystem.dto.ApiResponse;
import com.pdmstudents.hpesystem.service.ReportsService;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {
  private final ReportsService service;

  public ReportsController(ReportsService service) {
    this.service = service;
  }

  @GetMapping("/sales")
  public ApiResponse<List<Map<String, Object>>> getSalesReport(
      @RequestParam(defaultValue = "month") String interval) {
    List<Map<String, Object>> salesReport = service.getSalesReport(interval);
    return new ApiResponse<>(200, salesReport);
  }
}
