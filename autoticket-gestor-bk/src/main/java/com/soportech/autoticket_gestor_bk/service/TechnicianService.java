package com.soportech.autoticket_gestor_bk.service;

import com.soportech.autoticket_gestor_bk.model.Technician;
import com.soportech.autoticket_gestor_bk.repository.TechnicianRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TechnicianService {

    private final TechnicianRepository technicianRepository;
    private final PasswordEncoder passwordEncoder;

    public TechnicianService(TechnicianRepository technicianRepository, PasswordEncoder passwordEncoder) {
        this.technicianRepository = technicianRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public List<Technician> getAllTechnicians(){
        return technicianRepository.findAll();
    }

    public Technician getTechnicianById(UUID technicianId){
        return  technicianRepository.findById(technicianId).orElseThrow(() -> new RuntimeException("Technician not found" + technicianId));
    }

    public Technician createTechnician(Technician technician) {
        technician.setPassword(passwordEncoder.encode(technician.getPassword()));
        return technicianRepository.save(technician);
    }

    public Technician updateTechnicianAvailable(UUID technicianId, boolean newAvailable){

        Technician technician = technicianRepository.findById(technicianId).orElseThrow(() -> new RuntimeException("Technician not found" + technicianId));

        technician.setAvailable(newAvailable);

        Technician saved = technicianRepository.save(technician);

        return saved;
    }


}
