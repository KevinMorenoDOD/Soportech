package com.soportech.autoticket_gestor_bk.controller;

import com.soportech.autoticket_gestor_bk.model.StateHistory;
import com.soportech.autoticket_gestor_bk.model.Ticket;
import com.soportech.autoticket_gestor_bk.model.TicketAssignment;
import com.soportech.autoticket_gestor_bk.model.enums.TicketStatus;
import com.soportech.autoticket_gestor_bk.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }


    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping("/{code}")
    public ResponseEntity<Ticket> searchByCode(@PathVariable String code) {
        return ticketService.searchByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active/{technicianId}")
    public ResponseEntity<List<Ticket>> activeTicketByTechnician(@PathVariable UUID technicianId) {
        return ResponseEntity.ok(ticketService.getTicketsByTechnician(technicianId));
    }

    @GetMapping("/asigned")
    public ResponseEntity<List<TicketAssignment>> allTicketsAssigned(@RequestParam(required = false) TicketAssignment ticketAssignment) {
        if (ticketAssignment != null) {
            return ResponseEntity.ok(ticketService.getAllTicketsAsigned());
        }
        return ResponseEntity.ok(ticketService.getAllTicketsAsigned());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(
            @PathVariable UUID id,
            @RequestParam TicketStatus newStatus,
            @RequestParam String whatsappNumber,
            Authentication authentication) {
        String email = authentication.getName();
        Ticket updated = ticketService.updateStatus(id, newStatus, whatsappNumber, email);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<StateHistory>> getHistory(@PathVariable UUID id) {
        return ResponseEntity.ok(ticketService.getHistory(id));
    }
}
