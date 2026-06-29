package com.soportech.autoticket_gestor_bk.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WhatsappWebhookRequest {
    private String whatsappNumber;
    private String fullName;
    private String institutionalID;
    private String institutionalEmail;
    private String institutionalRole;
    private String programOrArea;
    private String problemDescription;
}