package com.soportech.autoticket_gestor_bk.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class N8nNotificationService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${n8n.webhook.status-url}")
    private String n8nUrl;

    @Async
    public void notifyStatusChange(UUID ticketId, String newStatus, String whatsappNumber) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("ticketId", ticketId);
        payload.put("newStatus", newStatus);
        payload.put("whatsappNumber", whatsappNumber);

        try {
            System.out.println(">>> Enviando a n8n...");
            String response = restTemplate.postForObject(n8nUrl, payload, String.class);
            System.out.println(">>> Respuesta de n8n: " + response);
        } catch (Exception e) {
            System.err.println(">>> Error: " + e.getMessage());
        }
    }
}