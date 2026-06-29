package com.soportech.autoticket_gestor_bk.service;

import com.soportech.autoticket_gestor_bk.dto.LoginRequest;
import com.soportech.autoticket_gestor_bk.dto.LoginResponse;
import com.soportech.autoticket_gestor_bk.model.Technician;
import com.soportech.autoticket_gestor_bk.repository.TechnicianRepository;
import com.soportech.autoticket_gestor_bk.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final TechnicianRepository technicianRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(TechnicianRepository technicianRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.technicianRepository = technicianRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        Technician technician = technicianRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), technician.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(technician.getEmail(), technician.getSub_role().name());
        return new LoginResponse(token, technician.getSub_role().name(), technician.getFullName(), technician.getSpecialty().name(), technician.getId());
    }
}
