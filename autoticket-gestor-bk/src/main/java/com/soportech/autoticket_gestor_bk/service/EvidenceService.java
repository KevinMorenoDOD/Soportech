package com.soportech.autoticket_gestor_bk.service;

import com.soportech.autoticket_gestor_bk.model.Evidence;
import com.soportech.autoticket_gestor_bk.model.Technician;
import com.soportech.autoticket_gestor_bk.model.Ticket;
import com.soportech.autoticket_gestor_bk.model.enums.EvidenceType;
import com.soportech.autoticket_gestor_bk.repository.EvidenceRepository;
import com.soportech.autoticket_gestor_bk.repository.TechnicianRepository;
import com.soportech.autoticket_gestor_bk.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EvidenceService {

    private final EvidenceRepository evidenceRepository;
    private final TicketRepository ticketRepository;
    private final TechnicianRepository technicianRepository;

    public EvidenceService(EvidenceRepository evidenceRepository, TicketRepository ticketRepository, TechnicianRepository technicianRepository) {
        this.evidenceRepository = evidenceRepository;
        this.ticketRepository = ticketRepository;
        this.technicianRepository = technicianRepository;
    }

    public Evidence addEvidence(UUID ticketId, UUID technicianId, EvidenceType type, String content, String fileUrl) {

        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found: " + ticketId));
        Technician technician = technicianRepository.findById(technicianId).orElseThrow(() ->new RuntimeException("Technician not found: " + technicianId));

        Evidence evidence = new Evidence();
        evidence.setTicket(ticket);
        evidence.setTechnician(technician);
        evidence.setType(type);
        evidence.setContent(content);
        evidence.setFileUrl(fileUrl);

        return evidenceRepository.save(evidence);
    }

    public List<Evidence> getByTicket(UUID ticketId) {
        return evidenceRepository.findByTicket_Id(ticketId);
    }

}
