package com.soportech.autoticket_gestor_bk.repository;

import com.soportech.autoticket_gestor_bk.model.IncidentCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface IncidentCategoryRepository extends JpaRepository<IncidentCategory, UUID> {
    List<IncidentCategory> findByAvailableTrue();
}
