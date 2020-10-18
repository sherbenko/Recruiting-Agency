package com.itechart.agency.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class AgencyDto {

    private Long id;
    private String name;
    private Long cityId;
    private Long countryId;
    private Long addressId;

    private String street;
    private String building;
    private String apartment;

    private String ownerEmail;
    private String adminEmail;

    private Double regularPayment;
    private Double deposit;



    private Boolean isDeleted;

}
