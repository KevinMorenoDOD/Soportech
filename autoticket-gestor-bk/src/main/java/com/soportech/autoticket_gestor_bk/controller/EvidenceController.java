package com.soportech.autoticket_gestor_bk.controller;


import com.soportech.autoticket_gestor_bk.dto.EvidenceRequest;
import com.soportech.autoticket_gestor_bk.model.Evidence;
import com.soportech.autoticket_gestor_bk.service.EvidenceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/evidences")
public class EvidenceController {

    private final EvidenceService evidenceService;

    public EvidenceController(EvidenceService evidenceService) {
        this.evidenceService = evidenceService;
    }

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<List<Evidence>> getByTicket(@PathVariable UUID ticketId) {
        return ResponseEntity.ok(evidenceService.getByTicket(ticketId));
    }

    @PostMapping
    public  ResponseEntity<Evidence> addEvidence(@RequestBody EvidenceRequest request){
        Evidence evidence = evidenceService.addEvidence(
                request.getTicketId(),
                request.getTechnicianId(),
                request.getType(),
                request.getContent(),
                request.getFileUrl()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(evidence);
    }


}
