package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.EmployerApplicationDto;
import com.itechart.agency.entity.EmployerApplication;
import org.modelmapper.ModelMapper;

public class EmployerApplicationConvert {

    public static EmployerApplicationDto convertEntityToDto(EmployerApplication entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, EmployerApplicationDto.class);
    }

    public static EmployerApplication convertDtoToEntity(EmployerApplicationDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, EmployerApplication.class);
    }

}
