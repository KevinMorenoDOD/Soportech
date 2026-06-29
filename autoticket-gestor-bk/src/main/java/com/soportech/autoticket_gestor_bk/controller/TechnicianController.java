package com.soportech.autoticket_gestor_bk.controller;

import com.soportech.autoticket_gestor_bk.model.Technician;
import com.soportech.autoticket_gestor_bk.repository.TechnicianRepository;
import com.soportech.autoticket_gestor_bk.service.TechnicianService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/Technicians")
public class TechnicianController {

    private final TechnicianService technicianService;

    public TechnicianController(  TechnicianService technicianService) {
        this.technicianService = technicianService;
    }

    @GetMapping
    public ResponseEntity<List<Technician>> getAllTechnicians() {
        return ResponseEntity.ok(technicianService.getAllTechnicians());
    }

    @GetMapping("/{technicianId}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable UUID technicianId) {
        return ResponseEntity.ok(technicianService.getTechnicianById(technicianId));
    }

    @PostMapping
    public ResponseEntity<Technician> createTechnician(@RequestBody Technician technician) {
        return ResponseEntity.ok(technicianService.createTechnician(technician));
    }

    @PatchMapping("/{technicianId}/available")
    public ResponseEntity <Technician> updateAvailable(
            @PathVariable UUID technicianId,
            @RequestParam boolean available){
        Technician technician = technicianService.updateTechnicianAvailable(technicianId, available);
        return ResponseEntity.ok(technician);
    }

}
