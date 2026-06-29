package com.soportech.autoticket_gestor_bk.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "classification_keywords")
public class ClassificationKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private IncidentCategory categoryId;

    @Column(name = "keyword", nullable = false, length = 100)
    private String keyword;

    @Column(name = "weight", nullable = false)
    private BigDecimal weight;

    @Column(name = "available", nullable = false)
    private boolean available;

}