package com.soportech.autoticket_gestor_bk.repository;

import com.soportech.autoticket_gestor_bk.model.Technician;
import com.soportech.autoticket_gestor_bk.model.TicketAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TicketAssignmentRepository extends JpaRepository<TicketAssignment, UUID> {
    List<TicketAssignment> findByTicketId(UUID ticketId);
    List<TicketAssignment> findByTechnicianIdAndActive(Technician technician, Boolean active);
}
