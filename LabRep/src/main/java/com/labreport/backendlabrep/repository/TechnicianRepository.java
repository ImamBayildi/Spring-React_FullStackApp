package com.labreport.backendlabrep.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.labreport.backendlabrep.entity.Technician;


@Repository
public interface TechnicianRepository extends JpaRepository<Technician,Long>{

    Optional<Technician> findByEmail(String email);

    Technician findByFullName(String technicianName);
    
}
