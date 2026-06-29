package com.soportech.autoticket_gestor_bk.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.soportech.autoticket_gestor_bk.model.enums.TicketStatus;
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
@JsonPropertyOrder({"id", "ticketCode", "status", "problemDescription", "whatsappOriginalMessage", "category", "user", "createdAt", "resolvedAt", "closedAt", "totalDuration"})
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "ticket_code", nullable = false, unique = true, length = 50, insertable = false)
    private String ticketCode;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private IncidentCategory category;

    @Column(name = "problem_description", nullable = false, columnDefinition = "text")
    private String problemDescription;

    @Column(name = "whatsapp_original_message", nullable = false, columnDefinition = "text")
    private String whatsappOriginalMessage;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false)
    private TicketStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "closed_at")
    private LocalDateTime closedAt;
}