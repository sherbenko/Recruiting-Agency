package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.QuestionGetDto;
import com.itechart.agency.dto.QuestionVariantDto;
import com.itechart.agency.entity.Question;
import com.itechart.agency.entity.QuestionVariant;
import org.modelmapper.ModelMapper;

import java.util.Objects;

public class QuestionGetConverter {
    public static QuestionGetDto convertEntityToDto(Question entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, QuestionGetDto.class);
    }

    public static Question toEntity(QuestionGetDto questionGetDto) {
        ModelMapper mapper = new ModelMapper();
        return Objects.isNull(questionGetDto) ? null : mapper.map(questionGetDto, Question.class);
    }
}
