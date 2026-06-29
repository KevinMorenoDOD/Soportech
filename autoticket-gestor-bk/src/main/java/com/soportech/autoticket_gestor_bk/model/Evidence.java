package com.soportech.autoticket_gestor_bk.model;

import com.soportech.autoticket_gestor_bk.model.enums.EvidenceType;
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
@Table(name = "evidences")
public class Evidence {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Technician technician;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private EvidenceType type;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "registered_at", updatable = false)
    private LocalDateTime registeredAt;

    @PrePersist
    public void prePersist() {
        this.registeredAt = LocalDateTime.now();
    }
}