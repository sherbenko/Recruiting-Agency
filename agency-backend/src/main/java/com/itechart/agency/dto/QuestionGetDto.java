package com.itechart.agency.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionGetDto {

    private Long id;
    private String name;
    private List<QuestionVariantDto> questionVariants;
    private QuestionTypeDto questionType;
    private String answer;
}
