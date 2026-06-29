package com.soportech.autoticket_gestor_bk.controller;

import com.soportech.autoticket_gestor_bk.model.Ticket;
import com.soportech.autoticket_gestor_bk.model.User;
import com.soportech.autoticket_gestor_bk.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/whatsapp/{number}")
    public ResponseEntity<User> searchByWhatsapp(@PathVariable String number) {
        Optional<User> user = userService.findByWhatsappNumber(number);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }


}
