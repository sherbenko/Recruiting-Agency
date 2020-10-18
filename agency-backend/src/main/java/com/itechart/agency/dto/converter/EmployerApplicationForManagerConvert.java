package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.EmployerApplicationDto;
import com.itechart.agency.dto.EmployerApplicationForManagerDto;
import com.itechart.agency.entity.EmployerApplication;
import org.modelmapper.ModelMapper;

public class EmployerApplicationForManagerConvert {

    public static EmployerApplicationForManagerDto convertEntityToDto(EmployerApplication entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, EmployerApplicationForManagerDto.class);
    }

    public static EmployerApplication convertDtoToEntity(EmployerApplicationForManagerDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, EmployerApplication.class);
    }

}
