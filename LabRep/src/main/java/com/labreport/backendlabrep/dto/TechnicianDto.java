package com.labreport.backendlabrep.dto;

import java.util.Date;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechnicianDto {
    private Long id;
    private String fullName;
    private String email;
    // private String password;
    private Date startingDate;
    private Set<Role> authorities;
}