package com.labreport.backendlabrep.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.labreport.backendlabrep.entity.Technician;
import com.labreport.backendlabrep.service.TechnicianService;

//TO DO => Convert to DTO Class
@RestController
@RequestMapping("/technician")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Technician>> getAllTechnician() {
        List<Technician> technicians = technicianService.getAllTechnician();

        if (!technicians.isEmpty()) {// is Present not available
            return ResponseEntity.ok(technicians);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable("id") Long id) {
        Optional<Technician> technicians = technicianService.getTechnicianById(id);

        if (technicians.isPresent()) {
            return ResponseEntity.ok(technicians.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/save")//!! TO DO => add password Encoder
    public ResponseEntity<String> saveTechnician(@RequestBody Technician technician) {
        try {
            Boolean result = technicianService.saveTechnician(technician);
            System.out.println(result);
            if (result) {
                return ResponseEntity.ok("Teknisyen kaydedildi");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Sunucuda bir hata meydana geldi: " + e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("İşlem başarısız");
    }

    @PutMapping("/delete/{id}")//WARN => Only update isWorking column
    public ResponseEntity<String> deleteTechnician(@PathVariable("id") Long id) {
        try {
            boolean isDeleted = technicianService.deleteTechnician(id);

            if (isDeleted) {
                return ResponseEntity.ok("İşlem başarılı");
            } else {
                return ResponseEntity.ok().body("Kullanıcı bulunamadı");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sunucuda bir hata meydana geldi");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTechnician(@RequestBody Technician technician) {

        try {
            technicianService.updateTechnician(technician);
            return ResponseEntity.status(HttpStatus.OK).body("Teknisyen güncellendi");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Sunucuda bir hata meydana geldi: " + e.getMessage());
        }

    }
}