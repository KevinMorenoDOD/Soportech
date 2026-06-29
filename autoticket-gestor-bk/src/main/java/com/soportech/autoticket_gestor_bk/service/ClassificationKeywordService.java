package com.soportech.autoticket_gestor_bk.service;

import com.soportech.autoticket_gestor_bk.model.ClassificationKeyword;
import com.soportech.autoticket_gestor_bk.model.IncidentCategory;
import com.soportech.autoticket_gestor_bk.repository.ClassificationKeywordRepository;
import com.soportech.autoticket_gestor_bk.repository.IncidentCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClassificationKeywordService {

    private final ClassificationKeywordRepository classificationKeywordRepository;
    private final IncidentCategoryRepository incidentCategoryRepository;


    public ClassificationKeywordService(ClassificationKeywordRepository classificationKeywordRepository,  IncidentCategoryRepository incidentCategoryRepository) {
        this.incidentCategoryRepository = incidentCategoryRepository;
        this.classificationKeywordRepository = classificationKeywordRepository;
    }

    public IncidentCategory classifyReport(String report) {
        List<ClassificationKeyword> keywords = classificationKeywordRepository.findByAvailableTrue();

        Map<UUID, Double> scores = new HashMap<>();
        Map<UUID, IncidentCategory> categoryMap = new HashMap<>();
        String reportLower = report.toLowerCase();

        for (ClassificationKeyword classificationKeyword : keywords) {
            if (reportLower.contains(classificationKeyword.getKeyword().toLowerCase())) {
                UUID catId = classificationKeyword.getCategoryId().getId();
                scores.merge(catId, classificationKeyword.getWeight().doubleValue(), Double::sum);
                categoryMap.put(catId, classificationKeyword.getCategoryId());
            }
        }

        if (scores.isEmpty()) {
            return incidentCategoryRepository.findByAvailableTrue()
                    .stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("No categories available"));
        }

        UUID bestCategoryId = Collections.max(scores.entrySet(), Map.Entry.comparingByValue()).getKey();
        return categoryMap.get(bestCategoryId);
    }

}

