package com.labreport.backendlabrep.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.labreport.backendlabrep.dto.ReportDto;
import com.labreport.backendlabrep.dto.converter.ReportDtoConverter;
import com.labreport.backendlabrep.entity.Report;
import com.labreport.backendlabrep.entity.Technician;
import com.labreport.backendlabrep.repository.ReportRepository;

@Service
public class ReportService {

    private final ReportDtoConverter reportDtoConverter;
    private final ReportRepository reportRepository;
    private final TechnicianService technicianService;

    public ReportService(ReportDtoConverter reportDtoConverter, ReportRepository reportRepository,
            TechnicianService technicianService) {
        this.reportDtoConverter = reportDtoConverter;
        this.reportRepository = reportRepository;
        this.technicianService = technicianService;
    }

    public List<Object[]> getAllReportJOINwriter() {
        List<Object[]> result = reportRepository.getReportsJoinWriter();
            return result;
    }

    public List<ReportDto> getAll() {
        List<Report> report = reportRepository.findAll();
        List<ReportDto> reportDto = report.parallelStream().map(reportDtoConverter::convertToDto).collect(Collectors.toList());
        return reportDto;
    }

    public ReportDto getReportById(long id) {
        ReportDto reportDto = reportDtoConverter.convertToDto(reportRepository.findById(id).orElse(null));
        return reportDto;
    }

    public Boolean saveReport(ReportDto reportDto) {
        Report result = reportRepository.save(reportDtoConverter.convertToEntity(reportDto));
        return result != null ? true : false;
    }

    public Boolean deleteReportById(Long id) {
        try {
            reportRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            throw e;
        }
    }

    public Boolean updateReport(Long writerId, ReportDto paramReport) {
        Optional<Report> optionalReport = reportRepository.findById(paramReport.getId());
        Technician writer = technicianService.getTechnicianById(writerId).orElseThrow();

        if (optionalReport.isPresent()) {
            Report updatedReport = optionalReport.get();
            // Fields copy to dto (source / target / ignores...)
            BeanUtils.copyProperties(paramReport, updatedReport, "id");
            updatedReport.setReportDate(new Date());
            updatedReport.setWriter(writer);
            reportRepository.save(updatedReport);
            return true;
        }
        return false;
    }

    public List<ReportDto> getReportByFullName(String fullName) {
        List<Report> report = reportRepository.findByFullName(fullName);
        return report.parallelStream().map(reportDtoConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ReportDto> getReportByTc(String identityNumber) {
        List<Report> reportList = reportRepository.findByTc(identityNumber);
        
        return reportList.parallelStream()
                .map(reportDtoConverter::convertToDto).collect(Collectors.toList());
    }

    public List<ReportDto> getReportByTechnician(String technicianName) {
        Technician technician = technicianService.findByFullName(technicianName);
        List<Report> reportList = reportRepository.findByWriter(technician);
        return reportList.stream().map(reportDtoConverter::convertToDto).collect(Collectors.toList());
    }

    public Page<ReportDto> getReportPagination(Pageable pageAble) {
        Page<Report> pReport = reportRepository.findAll(pageAble);
        Page<ReportDto> reportDto = pReport.map(report -> reportDtoConverter.pageToDto(report));
        return reportDto;
    }   
}
