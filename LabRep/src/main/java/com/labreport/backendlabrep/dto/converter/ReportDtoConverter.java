package com.labreport.backendlabrep.dto.converter;

import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.labreport.backendlabrep.dto.ReportDto;
import com.labreport.backendlabrep.entity.Report;
import com.labreport.backendlabrep.entity.Technician;

@Component
public class ReportDtoConverter {


    @Autowired
    private ModelMapper modelMapper;
    
    
    public ReportDto convertToDto(Report report) {
        ReportDto reportDto = modelMapper.map(report, ReportDto.class);
        return reportDto;
    }

    public Report convertToEntity(ReportDto reportDto) {
        Report report = modelMapper.map(reportDto, Report.class);
        return report;
    }

    public ReportDto pageToDto(Report report) {
        return modelMapper.map(report, ReportDto.class);
    }

    @Deprecated
    public ReportDto objectToDto(Object[] rep) {
        return new ReportDto(
            (Long) rep[0],
            (String) rep[1],
            (String) rep[2],
            (String) rep[3],
            (String) rep[4],
            (Date) rep[5],
            (Technician) rep[6],
            (byte[]) rep[7]
    );
    }

}
