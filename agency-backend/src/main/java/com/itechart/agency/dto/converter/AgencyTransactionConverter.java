package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.AgencyTransactionDto;
import com.itechart.agency.dto.EmployeeContractDto;
import com.itechart.agency.entity.AgencyTransaction;
import com.itechart.agency.entity.EmployeeContract;
import org.modelmapper.ModelMapper;

public class AgencyTransactionConverter {
    public static AgencyTransactionDto convertEntityToDto(AgencyTransaction entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, AgencyTransactionDto.class);
    }

    public static AgencyTransaction convertDtoToEntity(AgencyTransactionDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, AgencyTransaction.class);
    }

}
