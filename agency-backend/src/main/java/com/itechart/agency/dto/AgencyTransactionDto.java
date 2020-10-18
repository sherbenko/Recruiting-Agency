package com.itechart.agency.dto;

import com.itechart.agency.entity.Agency;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class AgencyTransactionDto {


    private Long id;
    private LocalDate date;
    private Double sum;
    private String agencyName;

    private Agency agency;
}
