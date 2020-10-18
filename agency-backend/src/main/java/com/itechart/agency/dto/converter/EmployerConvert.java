package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.EmployerDto;
import com.itechart.agency.entity.Employer;
import org.modelmapper.ModelMapper;

public class EmployerConvert {

    public static EmployerDto convertEntityToDto(Employer entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, EmployerDto.class);
    }

    public static Employer convertDtoToEntity(EmployerDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, Employer.class);
    }
}
