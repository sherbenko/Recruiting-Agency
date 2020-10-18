package com.itechart.agency.entity;

import com.itechart.agency.entity.lists.*;
import com.itechart.agency.entity.location.Address;
import com.itechart.agency.entity.location.City;
import com.itechart.agency.entity.location.Country;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;

@Entity
@Table(name = "employer_application")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployerApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private double price;

    @NotNull(message = "Agency for employer cannot be null")
    @ManyToOne
    @JoinColumn(name = "agency_id", referencedColumnName = "id")
    private Agency agency;

    @NotNull(message = "Employer for application cannot be null")
    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @NotNull(message = "Application creation date cannot be null")
    @Column(name = "creation_date")
    private Date creationDate;

    @NotNull(message = "Application end date cannot be null")
    @Column(name = "end_date")
    private Date endDate;

    @NotNull(message = "Application status cannot be null")
    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private Status status;

    //поля для заполнния работодателем
    @NotNull(message = "Profession in application cannot be null")
    @ManyToOne
    @JoinColumn(name = "profession_id", referencedColumnName = "id")
    private Profession profession;

    @NotNull(message = "Salary in application cannot be null")
    @Size(min = 1, max = 38, message = "Salary in application must be between 1 and 38 characters")
    @Column(name = "salary")
    private double salary;

    //рабочий график
    @NotNull(message = "Employment type in application cannot be null")
    @ManyToOne
    @JoinColumn(name = "employment_type_id", referencedColumnName = "id")
    private EmploymentType employmentType;

    @ManyToOne
    @JoinColumn(name = "experience_id", referencedColumnName = "id")
    private Experience experience;

    @ManyToOne
    @JoinColumn(name = "age_restriction_id", referencedColumnName = "id")
    private AgeRestriction ageRestriction;

    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @Size(max = 1000, message = "Employer application comment must be shorter than 1000 characters")
    @Column(name = "comment")
    private String comment;

    @Size(max = 100, message = "Expert name must be shorter than 100")
    @Column(name = "expert_personal_name")
    private String expertPersonalName;

    @NotNull(message = "Field is_deleted in contract cannot be null")
    @Column(name = "is_deleted")
    private boolean isDeleted;
}
