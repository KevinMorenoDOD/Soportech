package com.soportech.autoticket_gestor_bk.dto;

import com.soportech.autoticket_gestor_bk.model.enums.EvidenceType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class EvidenceRequest {
    private UUID ticketId;
    private UUID technicianId;
    private EvidenceType type;
    private String content;
    private String fileUrl;
}
