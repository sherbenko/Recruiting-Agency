package com.itechart.agency.entity;

import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.dto.UserDto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployerAndContract {
    private UserDto user;
    private EmployerContractDto contract;
}
