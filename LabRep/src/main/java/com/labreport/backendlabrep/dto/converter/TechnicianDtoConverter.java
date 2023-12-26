package com.labreport.backendlabrep.dto.converter;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.labreport.backendlabrep.dto.TechnicianDto;
import com.labreport.backendlabrep.entity.Technician;

@Component
public class TechnicianDtoConverter {

    @Autowired
    private ModelMapper modelMapper;
    
    
    public TechnicianDto convertToDto(Technician report) {
        TechnicianDto reportDto = modelMapper.map(report, TechnicianDto.class);
        return reportDto;
    }

    public Technician convertToEntity(TechnicianDto reportDto) {
        Technician report = modelMapper.map(reportDto, Technician.class);
        return report;
    }
    
}
