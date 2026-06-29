package com.soportech.autoticket_gestor_bk.repository;

import com.soportech.autoticket_gestor_bk.model.ClassificationKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ClassificationKeywordRepository extends JpaRepository<ClassificationKeyword, UUID> {
    List<ClassificationKeyword> findByAvailableTrue();
}
