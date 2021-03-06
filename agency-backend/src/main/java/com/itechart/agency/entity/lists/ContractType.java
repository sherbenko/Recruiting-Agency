package com.itechart.agency.entity.lists;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "agency_contract_types")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ContractType {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull(message = "Contract type cannot be null")
    @Size(min = 1, max = 50, message = "Contract type must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Contract type description cannot be null")
    @Size(min = 1, max = 100, message = "Contract type description must be between 1 and 100 characters")
    @Column(name = "description")
    private String description;
}
