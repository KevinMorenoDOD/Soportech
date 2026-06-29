package com.soportech.autoticket_gestor_bk.repository;

import com.soportech.autoticket_gestor_bk.model.Technician;
import com.soportech.autoticket_gestor_bk.model.enums.TechnicianSpecialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, UUID> {
    List<Technician> findBySpecialtyAndAvailableTrue(TechnicianSpecialty speciality);
    Optional <Technician> findByEmail(String email);
}
