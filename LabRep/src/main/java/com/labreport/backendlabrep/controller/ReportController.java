package com.labreport.backendlabrep.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.labreport.backendlabrep.dto.ReportDto;
import com.labreport.backendlabrep.service.ReportService;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private final ReportService reportService;

    public ReportController (ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/getReportPagination") //@RequestParam int page, @RequestParam int size, @RequestParam String sort
    public ResponseEntity<Page<ReportDto>> getReportPagination(Pageable pageAble) { //WARN => PAGE parameter have a 0. index.
        return ResponseEntity.ok(reportService.getReportPagination(pageAble));
    }

    @GetMapping("/getAllWithJOIN")
    public ResponseEntity<List<Object[]>> getAllReport() {//JPQL JOIN Get
        List<Object[]> reportList = reportService.getAllReportJOINwriter();
        if (!reportList.isEmpty()) {
            return ResponseEntity.ok(reportList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

     @GetMapping("/getAll")
    public ResponseEntity<List<ReportDto>> getAll() {
        return ResponseEntity.ok(reportService.getAll());
    }

    @GetMapping("/getReportById/{id}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable("id") long id) {
        ReportDto reportDto = reportService.getReportById(id);
        return ResponseEntity.ok(reportDto);
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> saveReport(@RequestBody ReportDto reportDto) {
        System.out.println(reportDto.getPhoto());
        reportDto.setReportDate(new java.util.Date());
        Boolean result = reportService.saveReport(reportDto);
        return result? ResponseEntity.ok(result): ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Boolean> deleteReportById(@PathVariable Long id) {
        Boolean result = reportService.deleteReportById(id);
    return result? ResponseEntity.ok(result): ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Boolean> updateReport(@PathVariable("id") Long writerId, @RequestBody ReportDto paramReport) {
        Boolean result = reportService.updateReport(writerId, paramReport);
        return result? ResponseEntity.ok(result): ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/getByFullName/{fullName}")
    public ResponseEntity<List<ReportDto>> getByFullName(@PathVariable("fullName") String fullName) {
        List<ReportDto> reportDto = reportService.getReportByFullName(fullName);
        return ResponseEntity.ok(reportDto);
    }

    @GetMapping("/getByTc/{tc}")
    public ResponseEntity<List<ReportDto>> getByTc(@PathVariable("tc") String IdentityNumber) {
        List<ReportDto> reportDto = reportService.getReportByTc(IdentityNumber);
        return ResponseEntity.ok(reportDto);
    }

    @GetMapping("/getByTechnicianName/{name}")
    public ResponseEntity<List<ReportDto>> getReportByTechnician(@PathVariable("name") String technicianName) {
        List<ReportDto> reportDto = reportService.getReportByTechnician(technicianName);
        return ResponseEntity.ok(reportDto);
    }
}
