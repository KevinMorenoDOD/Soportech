package com.soportech.autoticket_gestor_bk.repository;

import com.soportech.autoticket_gestor_bk.model.Ticket;
import com.soportech.autoticket_gestor_bk.model.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    Optional<Ticket> findByTicketCode(String ticketCode);
    List<Ticket> findByStatus(TicketStatus status);
    List<Ticket> findByUserId(UUID userId);
    List<Ticket> findByStatusNot(TicketStatus status);

    @Query("SELECT t FROM Ticket t JOIN FETCH t.user JOIN FETCH t.category")
    List<Ticket> findAllWithDetails();

    @Query("SELECT t FROM Ticket t JOIN FETCH t.user JOIN FETCH t.category WHERE t.status = :status")
    List<Ticket> findByStatusWithDetails(@Param("status") TicketStatus status);
}