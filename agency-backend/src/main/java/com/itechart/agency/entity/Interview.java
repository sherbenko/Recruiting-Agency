package com.itechart.agency.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //sequence doesnt work , generator="interviews_id_seq"
    private Long id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "agency_id")
    private Agency agency;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employer_application_id")
    private EmployerApplication employerApplication;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_contract_id")
    private EmployeeContract employeeContract;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "manager_id")
    private Manager manager;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "expert_id")
    private Expert expert;

    @Column(name = "start_date_time")
    @NotNull
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time")
    @NotNull
    private LocalDateTime endDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "interview_status_id")
    private InterviewStatus interviewStatus;

    @Column(name = "manager_comment")
    @NotNull
    private String managerComment;

    @Column(name = "expert_comment")
    @NotNull
    private String expertComment;

    /*@ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "interview_questions", joinColumns = {
            @JoinColumn(name = "interview_id")}, inverseJoinColumns = {
            @JoinColumn(name = "question_id")})
    private List<Question> questions;*/

}
