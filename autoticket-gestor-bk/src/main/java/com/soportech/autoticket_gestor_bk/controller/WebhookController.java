package com.soportech.autoticket_gestor_bk.controller;

import com.soportech.autoticket_gestor_bk.dto.WhatsappWebhookRequest;
import com.soportech.autoticket_gestor_bk.model.Ticket;
import com.soportech.autoticket_gestor_bk.model.User;
import com.soportech.autoticket_gestor_bk.service.TicketService;
import com.soportech.autoticket_gestor_bk.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhook")
public class WebhookController {

    private final UserService userService;
    private final TicketService ticketService;

    public WebhookController(UserService userService, TicketService ticketService) {
        this.userService = userService;
        this.ticketService = ticketService;
    }

    @PostMapping("/whatsapp")
    public ResponseEntity<Ticket> catchMessage(@RequestBody WhatsappWebhookRequest request) {

        User user = userService.searchOrCreateByWhatsapp(request);

        Ticket ticket = ticketService.createTicketFromWhatsapp(user, request.getProblemDescription());

        return ResponseEntity.ok(ticket);
    }
}