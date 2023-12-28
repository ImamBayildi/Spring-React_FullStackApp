package com.labreport.backendlabrep.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labreport.backendlabrep.entity.Technician;
import com.labreport.backendlabrep.repository.TechnicianRepository;

@Service
public class TechnicianService {
	@Autowired
	private TechnicianRepository technicianRepository;

	public Technician findByFullName(String technicianName) {
		return technicianRepository.findByFullName(technicianName);
	}
    
	public List<Technician> getAllTechnician() {
        return technicianRepository.findAll();
    }

    public Optional<Technician> getTechnicianById(Long id) {
        return technicianRepository.findById(id);
    }

    public Boolean saveTechnician(Technician paramTechnician) {
        System.out.println(paramTechnician.getId());
        Optional<Technician> exist = technicianRepository.findById(paramTechnician.getId());
        if (exist.isEmpty()) {
            technicianRepository.save(paramTechnician);
            return true;
        }
        return false;
    }
    
    public boolean deleteTechnician(Long id) {//WARN => Only update isWorking column
        Technician stockTechnician = technicianRepository.findById(id).orElse(null);
        if (stockTechnician.getIsWorking()) {
            stockTechnician.setIsWorking(false);
            technicianRepository.save(stockTechnician);
            return true;
        } else {
            return false;
        }
    }

    public Technician updateTechnician(Technician paramTechnician) {
        technicianRepository.save(paramTechnician);
        return technicianRepository.save(paramTechnician);

    }
}
