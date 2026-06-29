package com.soportech.autoticket_gestor_bk.model;

import com.soportech.autoticket_gestor_bk.model.enums.InstitutionalRole;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "id_institutional", nullable = false, unique = true, length = 50)
    private String idInstitutional;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(name = "institutional_email", nullable = false, unique = true, length = 150)
    private String institutionalEmail;

    @Column(name = "whatsapp_number", nullable = false, length = 20)
    private String whatsappNumber;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "institutional_role", nullable = false)
    private InstitutionalRole institutionalRole;

    @Column(name = "program_or_area",  length = 150)
    private String programOrArea;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public User() {}
    public   UUID getId() {return id;}
    public void setId(UUID id) {this.id = id;}

    public String getIdInstitutional() {return idInstitutional;}
    public void setIdInstitutional(String idInstitutional) {this.idInstitutional = idInstitutional;}

    public String getFullName() {return fullName;}
    public void setFullName(String fullName) {this.fullName = fullName;}

    public String getInstitutionalEmail() {return institutionalEmail;}
    public void  setInstitutionalEmail(String institutionalEmail) {this.institutionalEmail = institutionalEmail;}

    public String getWhatsappNumber() {return whatsappNumber;}
    public void setWhatsappNumber(String whatsappNumber) {this.whatsappNumber = whatsappNumber;}

    public InstitutionalRole getInstitutionalRole() {return institutionalRole;}
    public void setInstitutionalRole(InstitutionalRole institutionalRole) {this.institutionalRole = institutionalRole;}

    public String getProgramOrArea() {return programOrArea;}
    public void setProgramOrArea(String programOrArea) {this.programOrArea = programOrArea;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}

}
