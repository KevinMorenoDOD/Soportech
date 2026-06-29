package com.soportech.autoticket_gestor_bk.model;

import com.soportech.autoticket_gestor_bk.model.enums.RoleInTicket;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ticket_assignments")
public class TicketAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticketId;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Technician technicianId;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "role_in_ticket", nullable = false)
    private RoleInTicket roleInTicket;

    @Column(name = "assigned_at", updatable = false)
    private LocalDateTime assignedAt;

    @Column(name = "active", nullable = false)
    private Boolean active;

    @PrePersist
    public void prePersist() {
        this.assignedAt = LocalDateTime.now();
    }
}