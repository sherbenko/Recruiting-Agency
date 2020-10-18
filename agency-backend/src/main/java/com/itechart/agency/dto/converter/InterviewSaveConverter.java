package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.EmployeeContractDto;
import com.itechart.agency.dto.InterviewSaveDto;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.EmployeeContract;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.InterviewQuestion;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class InterviewSaveConverter {
    public static InterviewSaveDto convertEntityToDto(Interview entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, InterviewSaveDto.class);
    }

    public static Interview toEntity(InterviewSaveDto interviewSaveDto) {
        ModelMapper mapper = new ModelMapper();
        return Objects.isNull(interviewSaveDto) ? null : mapper.map(interviewSaveDto, Interview.class);
    }
}
