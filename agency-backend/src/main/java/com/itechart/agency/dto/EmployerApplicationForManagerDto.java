package com.itechart.agency.dto;

import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.Employer;
import com.itechart.agency.entity.lists.EmploymentType;
import com.itechart.agency.entity.lists.Feature;
import com.itechart.agency.entity.lists.Profession;
import com.itechart.agency.entity.lists.Status;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployerApplicationForManagerDto {

    /*private Long id;
    private Agency agency;
    private Date creation_date;
    private Employer employer;
    private Profession profession;
    private double salary;
    private EmploymentType employmentType;
    private String expert_personal_name;
    private Date end_date;
    private Status status;*/

    private Long id;
    private Long agencyId;//
    private String agencyName;
    private Long employerId;//
    private String employerName;
    private Date creationDate;
    private Date endDate;
    private String statusName;//
    private String professionName;//
    private double salary;
    private String employmentTypeName;
    private /*Enums.Experience*/String experience;
    private /*Enums.AgeRestriction*/String ageRestriction;
    private String comment;
    private String expertPersonalName;
}
