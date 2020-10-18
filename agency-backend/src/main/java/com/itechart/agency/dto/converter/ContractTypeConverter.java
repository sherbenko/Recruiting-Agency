package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.AgencyTransactionDto;
import com.itechart.agency.dto.ContractTypeDto;
import com.itechart.agency.entity.AgencyTransaction;
import com.itechart.agency.entity.lists.ContractType;
import org.modelmapper.ModelMapper;

public class ContractTypeConverter {
    public static ContractTypeDto convertEntityToDto(ContractType entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, ContractTypeDto.class);
    }

    public static ContractType convertDtoToEntity(ContractTypeDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, ContractType.class);
    }
}
