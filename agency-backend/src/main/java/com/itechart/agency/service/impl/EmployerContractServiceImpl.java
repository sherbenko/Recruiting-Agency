package com.itechart.agency.service.impl;

import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.dto.converter.EmployerContractConvert;
import com.itechart.agency.entity.EmployerContract;
import com.itechart.agency.exception.BadRequestException;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.*;
import com.itechart.agency.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class EmployerContractServiceImpl implements CrudService<EmployerContractDto> {


    private final EmployerContractRepository employerContractRepository;
    //private final FileRepository fileRepository;
    private final ContractTypeRepository contractTypeRepository;


    @Autowired
    public EmployerContractServiceImpl(EmployerContractRepository employerContractRepository, ContractTypeRepository contractTypeRepository) {

        this.employerContractRepository = employerContractRepository;
       // this.fileRepository = fileRepository;
        this.contractTypeRepository = contractTypeRepository;
    }


    @Override
    public EmployerContractDto findById(Long id) {
        EmployerContractDto contractDto;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerContractRepository.findById(id).isPresent()) {
            contractDto = EmployerContractConvert.convertEntityToDto
                    (employerContractRepository.findById(id).get());
        } else {
            throw new NotFoundException("Employer contract not found");
        }
        if (!contractDto.isDeleted())
            return contractDto;
        else {
            throw new NotFoundException("Employer contract was deleted");
        }
    }

    @Override
    public List<EmployerContractDto> findAll() {
        //List<EmployerContract> contracts = employerContractRepository.findAll();
        List<EmployerContract> contracts = employerContractRepository.findAllByIs_deletedIsFalse();
        return contracts.stream().map((EmployerContractConvert::convertEntityToDto)).collect(Collectors.toList());
    }

    @Override
    public Long create(EmployerContractDto contractDto) {
        try {
            EmployerContract contract = setData(contractDto);
            employerContractRepository.save(contract);
            return contract.getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(EmployerContractDto contractDto) {
        EmployerContract contract = setData(contractDto);
        if (contractDto.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (employerContractRepository.findById(contractDto.getId()).isPresent()) {
            employerContractRepository.save(contract);
            return contract.getId();
        } else {
            throw new NotFoundException("Employer contract doesn't exist");
        }
    }

    private EmployerContract setData(EmployerContractDto contractDto) {
        if (contractTypeRepository.findById(contractDto.getContractTypeId()).isEmpty())
//                fileRepository.findById(contractDto.getFileId()).isEmpty())
            throw new NotFoundException("Contract type doesn't exist");

        EmployerContract contract = EmployerContractConvert.convertDtoToEntity(contractDto);
        //contract.setFile(fileRepository.findById(contractDto.getFileId()).get());
        contract.setContractType(contractTypeRepository.findById(contractDto.getContractTypeId()).get());
        return contract;
    }

    @Override
    public void deleteById(Long id) {
        EmployerContract contract;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerContractRepository.findById(id).isPresent()) {
            contract = employerContractRepository.findById(id).get();
        } else {
            throw new NotFoundException("Employer contract not found");
        }
        if (!contract.isDeleted()) {
            contract.setDeleted(true);
            employerContractRepository.save(contract);
        }
    }

    @Override
    public void delete(EmployerContractDto employerContractDto) {
        deleteById(employerContractDto.getId());
    }
}
