package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.InterviewGetDto;
import com.itechart.agency.dto.InterviewStatusDto;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.InterviewStatus;
import org.modelmapper.ModelMapper;

import java.util.Objects;

public class InterviewStatusConverter {
    public static InterviewStatusDto convertEntityToDto(InterviewStatus entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, InterviewStatusDto.class);
    }

    public static Interview toEntity(InterviewStatusDto interviewStatusDto) {
        ModelMapper mapper = new ModelMapper();
        return Objects.isNull(interviewStatusDto) ? null : mapper.map(interviewStatusDto, Interview.class);
    }
}
