package com.soportech.autoticket_gestor_bk.model;

import com.soportech.autoticket_gestor_bk.model.enums.TechnicianSpecialty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "incident_categories")
public class IncidentCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, unique = true, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "specialty_required")
    private TechnicianSpecialty specialtyRequired;

    @Column(name = "available", nullable = false)
    private Boolean available;
}
