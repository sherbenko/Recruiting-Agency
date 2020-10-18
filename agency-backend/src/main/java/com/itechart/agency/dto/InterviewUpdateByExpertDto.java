package com.itechart.agency.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InterviewUpdateByExpertDto {

    private Long interviewId;
    /*private Long agencyId;
    private Long employerApplicationId;
    private Long employeeContractId;*/
    private Long interviewStatusId;
    private String expertComment;
    private List<QuestionDto> questions;
   /* private Long managerId;*/
    /*private Long expertId;*/
    /*@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startDateTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endDateTime;*/
    public List<QuestionDto> getQuestions() {
        return questions;
    }
}
