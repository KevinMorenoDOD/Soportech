package com.soportech.autoticket_gestor_bk.service;

import com.soportech.autoticket_gestor_bk.model.*;
import com.soportech.autoticket_gestor_bk.model.enums.RoleInTicket;
import com.soportech.autoticket_gestor_bk.model.enums.TechnicianSpecialty;
import com.soportech.autoticket_gestor_bk.model.enums.TicketStatus;
import com.soportech.autoticket_gestor_bk.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TicketService {

    private final N8nNotificationService n8nNotificationService;
    private final TicketRepository ticketRepository;
    private final IncidentCategoryRepository incidentCategoryRepository;
    private final ClassificationKeywordService classificationKeywordService;
    private final TechnicianRepository technicianRepository;
    private final TicketAssignmentRepository ticketAssignmentRepository;
    private final StateHistoryRepository stateHistoryRepository;

    public TicketService(TicketRepository ticketRepository,
                         IncidentCategoryRepository incidentCategoryRepository,
                         N8nNotificationService n8nNotificationService,
                         ClassificationKeywordService classificationKeywordService, TechnicianRepository technicianRepository, TicketAssignmentRepository ticketAssignmentRepository, StateHistoryRepository stateHistoryRepository) {
        this.ticketRepository = ticketRepository;
        this.incidentCategoryRepository = incidentCategoryRepository;
        this.n8nNotificationService = n8nNotificationService;
        this.classificationKeywordService = classificationKeywordService;
        this.technicianRepository = technicianRepository;
        this.ticketAssignmentRepository = ticketAssignmentRepository;
        this.stateHistoryRepository = stateHistoryRepository;
    }

    private void autoAssign(Ticket ticket, TechnicianSpecialty specialty) {
        List<Technician> technicians = technicianRepository.findBySpecialtyAndAvailableTrue(specialty);
        if (technicians.isEmpty()) return;

        Technician selected = technicians.stream()
                .min(Comparator.comparingInt(t ->
                        ticketAssignmentRepository.findByTechnicianIdAndActive(t, true).size()
                ))
                .orElse(technicians.get(0));

        TicketAssignment assignment = new TicketAssignment();
        assignment.setTicketId(ticket);
        assignment.setTechnicianId(selected);
        assignment.setRoleInTicket(RoleInTicket.primary);
        assignment.setActive(true);

        ticketAssignmentRepository.save(assignment);
    }

    public Ticket createTicket(User user, UUID incidentCategoryId, String description, String originalMessage) {
        IncidentCategory incidentCategory = incidentCategoryRepository.findById(incidentCategoryId).orElseThrow(() -> new RuntimeException("incident category not found" + incidentCategoryId));

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setCategory(incidentCategory);
        ticket.setProblemDescription(description);
        ticket.setWhatsappOriginalMessage(originalMessage);
        ticket.setStatus(TicketStatus.in_progress);

        return ticketRepository.save(ticket);
    }


    public Ticket createTicketFromWhatsapp(User user, String report) {
        IncidentCategory category = classificationKeywordService.classifyReport(report);

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setCategory(category);
        ticket.setProblemDescription(report);
        ticket.setWhatsappOriginalMessage(report);
        ticket.setStatus(TicketStatus.in_progress);

        Ticket saved = ticketRepository.save(ticket);
        ticketRepository.flush();
        autoAssign(saved, saved.getCategory().getSpecialtyRequired());
        return ticketRepository.findById(saved.getId()).orElseThrow();

    }

    public List<Ticket> getTicketsByTechnician(UUID technicianId) {
      Technician technician = technicianRepository.findById(technicianId).orElseThrow(() -> new RuntimeException("technician not found" + technicianId));

      return  ticketAssignmentRepository.findByTechnicianIdAndActive(technician, true).stream().map(assignment -> assignment.getTicketId()).toList();

    }

    public List<TicketAssignment> getAllTicketsAsigned(){
        return ticketAssignmentRepository.findAll();
    }

    public List<Ticket> listByStatus(TicketStatus status) {
        return ticketRepository.findByStatusWithDetails(status);
    }

    public Optional<Ticket> searchByCode(String code) {
        return ticketRepository.findByTicketCode(code);
    }

    public Ticket updateStatus(UUID ticketId, TicketStatus newStatus, String whatsappNumber, String email) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found: " + ticketId));

        ticket.setStatus(newStatus);

        if (newStatus == TicketStatus.solved) {
            ticket.setResolvedAt(LocalDateTime.now());
        }
        if (newStatus == TicketStatus.closed) {
            ticket.setClosedAt(LocalDateTime.now());
        }

        Ticket saved = ticketRepository.save(ticket);

        n8nNotificationService.notifyStatusChange(ticketId, newStatus.name(), whatsappNumber);
        return saved;
    }

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAllWithDetails();
    }

    public List<StateHistory> getHistory(UUID ticketId) {
        return stateHistoryRepository.findByTicket_Id(ticketId);
    }
}

