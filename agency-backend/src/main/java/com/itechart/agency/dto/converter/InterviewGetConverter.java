package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.InterviewGetDto;
import com.itechart.agency.dto.InterviewSaveDto;
import com.itechart.agency.entity.Interview;
import org.modelmapper.ModelMapper;

import java.util.Objects;

public class InterviewGetConverter {
    public static InterviewGetDto convertEntityToDto(Interview entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, InterviewGetDto.class);
    }

    public static Interview toEntity(InterviewGetDto interviewGetDto) {
        ModelMapper mapper = new ModelMapper();
        return Objects.isNull(interviewGetDto) ? null : mapper.map(interviewGetDto, Interview.class);
    }
}
