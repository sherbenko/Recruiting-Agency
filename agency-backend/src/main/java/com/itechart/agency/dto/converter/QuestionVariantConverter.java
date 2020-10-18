package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.InterviewStatusDto;
import com.itechart.agency.dto.QuestionVariantDto;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.InterviewStatus;
import com.itechart.agency.entity.QuestionVariant;
import org.modelmapper.ModelMapper;

import java.util.Objects;

public class QuestionVariantConverter {
    public static QuestionVariantDto convertEntityToDto(QuestionVariant entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, QuestionVariantDto.class);
    }

    public static QuestionVariant toEntity(QuestionVariantDto questionVariantDto) {
        ModelMapper mapper = new ModelMapper();
        return Objects.isNull(questionVariantDto) ? null : mapper.map(questionVariantDto, QuestionVariant.class);
    }
}
