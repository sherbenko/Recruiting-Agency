package com.itechart.agency.dto;

import lombok.Data;

@Data
public class AuthenticateRequestDto {
    private String email;
    private String password;
}
