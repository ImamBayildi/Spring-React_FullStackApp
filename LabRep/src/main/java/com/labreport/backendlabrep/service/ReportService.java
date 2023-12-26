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

    @Deprecated
    public List<Object[]> getAllReportJOINwriter() {//TO DO => Convert Response data to HashMap
        List<Object[]> result = reportRepository.getReportsJoinWriter();

           /*  List<ReportDto> resultList = result.stream()
            .map(row -> new ReportDto(
                    (Long) row[0],
                    (String) row[1],
                    (String) row[2],
                    (String) row[3],
                    (String) row[4],
                    (Date) row[5],
                    (Technician) row[6],
                    (byte[]) row[7]
            )).collect(Collectors.toList());
//OR
            List<ReportDto> resuList2 = result.stream()
                .map(reportDtoConverter::objectToDto).collect(Collectors.toList());*/

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
            reportRepository.deleteById(id);//.deleteById() is not have a return value, do i need sql response? (when 0 rows effected)
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
        return report.parallelStream().map(reportDtoConverter::convertToDto)// report -> this.convertToDto(report)
                .collect(Collectors.toList());
    }

    public List<ReportDto> getReportByTc(String identityNumber) {
        List<Report> reportList = reportRepository.findByTc(identityNumber);
        
        return reportList.parallelStream()
                .map(reportDtoConverter::convertToDto).collect(Collectors.toList());
    }

    public List<ReportDto> getReportByTechnician(String technicianName) {
        Technician technician = technicianService.findByFullName(technicianName);
        List<Report> reportList = reportRepository.findByWriter(technician);// Dont get other repository
        return reportList.stream().map(reportDtoConverter::convertToDto).collect(Collectors.toList());
    }

    //<<<<<<<<<PAGINATION>>>>>>>>>>
    public Page<ReportDto> getReportPagination(Pageable pageAble) {
        // Pageable pageable = PageRequest.of(page, size);
        Page<Report> pReport = reportRepository.findAll(pageAble);
        //Page<Report> => all Reports to ReportDto => Page<ReportDto>
        Page<ReportDto> reportDto = pReport.map(report -> reportDtoConverter.pageToDto(report));
        return reportDto;
    }

    
}

/*
 * if(reportDto.reportDate() == null) {
 * reportDto.setReportDate(new java.sql.Date(new java.util.Date().getTime()));
 * }
 */