package com.itechart.agency.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionDto {

    private String questionName;
    //private Long id;
    private List<QuestionVariantDto> variants;
}
