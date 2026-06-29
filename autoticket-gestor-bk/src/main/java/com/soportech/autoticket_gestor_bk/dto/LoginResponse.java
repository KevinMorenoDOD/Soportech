package com.soportech.autoticket_gestor_bk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String role;
    private String fullName;
    private String specialty;
    private UUID id;
}