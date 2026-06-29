package com.soportech.autoticket_gestor_bk.model;

import com.soportech.autoticket_gestor_bk.model.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "state_history")
public class StateHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private Technician technicianId;

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_state")
    private TicketStatus previousState;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_state", nullable = false)
    private TicketStatus newState;

    @Column(name = "comments", columnDefinition = "text")
    private String comments;

    @Column(name = "changed_at", updatable = false)
    private LocalDateTime changedAt;
}