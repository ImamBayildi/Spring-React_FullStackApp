package com.labreport.backendlabrep.dto;


import java.util.Date;

import com.labreport.backendlabrep.entity.Technician;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {

    private Long id;
    private String fullName;
    private String tc;
    private String diagnosis;
    private String details;
    private Date reportDate;
    private Technician writer;
    private byte[] photo;

}