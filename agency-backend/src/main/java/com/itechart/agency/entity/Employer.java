package com.itechart.agency.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itechart.agency.dto.AgencyDto;
import com.itechart.agency.entity.location.City;
import com.itechart.agency.entity.location.Address;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "employer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Employer name cannot be null")
    @Size(min = 1, max = 50, message = "Employer name must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Employer cannot but be an user")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    //стоит убрать
    @NotNull(message = "Agency for employer cannot be null")
    @ManyToOne
    @JoinColumn(name = "agency_id", referencedColumnName = "id")
    private Agency agency;

    @NotNull(message = "Employer contract cannot be null")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employer_agency_contract_id", referencedColumnName = "id")
    private EmployerContract employerContract;

    @OneToMany(mappedBy = "employer")
    @JsonIgnore
    private List<EmployerApplication> applications;


}
