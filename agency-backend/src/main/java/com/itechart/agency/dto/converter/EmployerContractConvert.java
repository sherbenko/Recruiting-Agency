package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.entity.EmployerContract;
import org.modelmapper.ModelMapper;

public class EmployerContractConvert {
    public static EmployerContractDto convertEntityToDto(EmployerContract entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, EmployerContractDto.class);
    }

    public static EmployerContract convertDtoToEntity(EmployerContractDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, EmployerContract.class);
    }
}
