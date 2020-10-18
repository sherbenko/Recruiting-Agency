package com.itechart.agency.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.EmployerApplication;
import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.InterviewStatus;
import lombok.*;
import org.apache.catalina.Manager;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InterviewGetDto {

    private Long id;
    private String expertName;
    private String expertId;
    private String expertUserId;
    private String employeeName;
    private String employeeSurname;
    private String interviewStatusName;
    private Long interviewStatusId;
    //private EmployerApplication employerApplication;
    //private EmployeeContractDto employeeContractId;
    //private InterviewStatus interviewStatus;
    //private Manager manager;
    //private Expert expert;
    /*@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")*/
    private LocalDateTime startDateTime;
   /* @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")*/
    private LocalDateTime endDateTime;
    private String managerComment;
    private String expertComment;
}
