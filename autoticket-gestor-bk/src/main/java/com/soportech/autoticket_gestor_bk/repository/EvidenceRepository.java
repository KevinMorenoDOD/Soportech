package com.soportech.autoticket_gestor_bk.repository;

import com.soportech.autoticket_gestor_bk.model.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, UUID> {
    List<Evidence> findByTicket_Id(UUID ticketId);
}
