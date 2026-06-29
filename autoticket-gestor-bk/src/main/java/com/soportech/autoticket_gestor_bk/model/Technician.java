package com.soportech.autoticket_gestor_bk.model;

import com.soportech.autoticket_gestor_bk.model.enums.TechnicianSpecialty;
import com.soportech.autoticket_gestor_bk.model.enums.SubTechnicianRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "technicians")
public class Technician {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "specialty", nullable = false)
    private TechnicianSpecialty specialty;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "sub_role", nullable = false)
    private SubTechnicianRole sub_role;

    @Column(name = "available", nullable = false)
    private boolean available;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime created_at;

    @PrePersist
    public void prePersist() {
        this.created_at = LocalDateTime.now();
    }

    @Column(name = "password", nullable = false)
    private String password;


}
