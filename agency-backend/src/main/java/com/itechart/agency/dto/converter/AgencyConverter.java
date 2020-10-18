package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.AgencyDto;
import com.itechart.agency.dto.EmployeeContractDto;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.EmployeeContract;
import org.modelmapper.ModelMapper;

public class AgencyConverter {
    public static AgencyDto convertEntityToDto(Agency entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, AgencyDto.class);
    }

    public static Agency convertDtoToEntity(AgencyDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, Agency.class);
    }
}
