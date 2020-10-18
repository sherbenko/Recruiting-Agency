package com.itechart.agency.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.itechart.agency.entity.location.Address;
//import com.itechart.agency.entity.location.City;
import com.itechart.agency.entity.location.Address;
import com.itechart.agency.entity.location.City;
import lombok.*;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "agencies")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@ToString
public class Agency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Agency name cannot be null")
    @Size(min = 1, max = 50, message = "Agency name must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;


    @Column(name = "regular_payment")
    private Double regularPayment;

    @Column(name = "deposit")
    private Double deposit;

    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @Column(name = "date_activate")
    private LocalDate activateDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToMany(mappedBy = "agency",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "agency")
    @JsonIgnore
    private List<EmployeeContract> employeeContracts;
}
