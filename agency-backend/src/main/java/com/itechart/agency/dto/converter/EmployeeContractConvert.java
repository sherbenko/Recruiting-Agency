package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.EmployeeContractDto;
import com.itechart.agency.entity.EmployeeContract;
import org.modelmapper.ModelMapper;

public class EmployeeContractConvert {
    public static EmployeeContractDto convertEntityToDto(EmployeeContract entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, EmployeeContractDto.class);
    }

    public static EmployeeContract convertDtoToEntity(EmployeeContractDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, EmployeeContract.class);
    }
}
