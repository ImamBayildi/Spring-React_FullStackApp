package com.labreport.backendlabrep.service.securityService;

import java.util.Date;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.labreport.backendlabrep.dto.CreateUserRequest;
import com.labreport.backendlabrep.dto.TechnicianDto;
import com.labreport.backendlabrep.dto.converter.TechnicianDtoConverter;
import com.labreport.backendlabrep.entity.Technician;
import com.labreport.backendlabrep.repository.TechnicianRepository;

import jakarta.persistence.EntityNotFoundException;

@Service//TO DO => Move this code to Technician Service
public class SecurityService implements UserDetailsService {
    private final TechnicianRepository technicianRepository;
    private final TechnicianDtoConverter technicianDtoConverter;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SecurityService(TechnicianRepository technicianRepository, TechnicianDtoConverter technicianDtoConverter,
            BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.technicianRepository = technicianRepository;
        this.technicianDtoConverter = technicianDtoConverter;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Technician> x = technicianRepository.findByEmail(username);//username yerine email dönecek.
        return x.orElseThrow(EntityNotFoundException::new);
    }

    public TechnicianDto getByEmail(String username) {
        TechnicianDto tech = technicianDtoConverter.convertToDto(technicianRepository.findByEmail(username).orElse(null));
        return tech;
    }

    public Technician createTechnician(CreateUserRequest req) {
        Technician technician = new Technician(
            null,
            req.fullName(),
            req.email(),
            bCryptPasswordEncoder.encode(req.password()),//WARN => pw need encoder
            new Date(),
            true,
            //null,
            req.authorities(),
            true, true, true, true
        );

        return technicianRepository.save(technician);//TechnicianRepository.class.getInterfaces().save(technician)
    }
    
}
