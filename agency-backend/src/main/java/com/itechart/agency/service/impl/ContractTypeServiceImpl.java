package com.itechart.agency.service.impl;

import com.itechart.agency.dto.ContractTypeDto;
import com.itechart.agency.dto.converter.ContractTypeConverter;
import com.itechart.agency.entity.location.Country;
import com.itechart.agency.repository.ContractTypeRepository;
import com.itechart.agency.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContractTypeServiceImpl implements CrudService<ContractTypeDto> {

    @Autowired
    private ContractTypeRepository contractTypeRepository;
    @Override
    public Long create(ContractTypeDto contractTypeDto) {
        return null;
    }

    @Override
    public ContractTypeDto findById(Long id) {
        return null;
    }

    @Override
    public List<ContractTypeDto> findAll() {
        return contractTypeRepository.findAll().stream().map(ContractTypeConverter::convertEntityToDto).collect(Collectors.toList());
    }

    @Override
    public Long update(ContractTypeDto contractTypeDto) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void delete(ContractTypeDto contractTypeDto) {

    }
}
