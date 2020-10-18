package com.itechart.agency.service.impl;

import com.itechart.agency.dto.EmployeeContractDto;
import com.itechart.agency.dto.converter.EmployeeContractConvert;
import com.itechart.agency.entity.EmployeeContract;
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
public class EmployeeContractServiceImpl implements CrudService<EmployeeContractDto> {
    private final EmployeeContractRepository employeeContractRepository;
    private final AgencyRepository agencyRepository;
    private final CityRepository cityRepository;
    private final AddressRepository addressRepository;
    private final ProfessionRepository professionRepository;
    private final StatusRepository statusRepository;
    private final FeatureRepository featureRepository;
    private final EmploymentTypeRepository employmentTypeRepository;


    @Autowired
    public EmployeeContractServiceImpl(EmployeeContractRepository employeeContractRepository, AgencyRepository agencyRepository,
                                       FeatureRepository featureRepository, EmploymentTypeRepository employmentTypeRepository,
                                       CityRepository cityRepository, AddressRepository addressRepository,
                                       StatusRepository statusRepository, ProfessionRepository professionRepository) {
        this.cityRepository = cityRepository;
        this.addressRepository = addressRepository;
        this.agencyRepository = agencyRepository;
        this.professionRepository = professionRepository;
        this.statusRepository = statusRepository;
        this.employeeContractRepository = employeeContractRepository;
        this.featureRepository = featureRepository;
        this.employmentTypeRepository = employmentTypeRepository;
    }


    public List<EmployeeContractDto> getContractsByStatus(String status) {
        if (statusRepository.findByName(status).isEmpty())
            throw new NotFoundException("Status doesn't exist");
        List<EmployeeContract> contractList = employeeContractRepository.findByStatus(statusRepository.findByName(status).get());
        return contractList.stream().map((EmployeeContractConvert::convertEntityToDto)).collect(Collectors.toList());
    }


    public EmployeeContractDto changeContractStatus(Long contractId, String newStatus) {
        if (employeeContractRepository.findById(contractId).isEmpty() || statusRepository.findByName(newStatus).isEmpty())
            throw new NotFoundException("Employee contract or/and status doesn't exist");
        else {
            EmployeeContract employeeContract = employeeContractRepository.findById(contractId).get();
            employeeContract.setStatus(statusRepository.findByName(newStatus).get());
            return EmployeeContractConvert.convertEntityToDto(employeeContractRepository.save(employeeContract));
        }
    }


    @Override
    public EmployeeContractDto findById(Long id) {
        EmployeeContractDto contractDto;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employeeContractRepository.findById(id).isPresent()) {
            contractDto = EmployeeContractConvert.convertEntityToDto
                    (employeeContractRepository.findById(id).get());
        } else {
            throw new NotFoundException("Employee contract not found");
        }
        if (!contractDto.isDeleted())
            return contractDto;
        else {
            throw new NotFoundException("Employee contract was deleted");
        }
    }

    public EmployeeContractDto findByUserId(Long id) {
        EmployeeContractDto contractDto;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employeeContractRepository.findByUserId(id).isPresent()) {
            contractDto = EmployeeContractConvert.convertEntityToDto
                    (employeeContractRepository.findByUserId(id).get());
        } else {
            throw new NotFoundException("Employee contract not found");
        }
        if (!contractDto.isDeleted())
            return contractDto;
        else {
            throw new NotFoundException("Employee contract was deleted");
        }
    }


    @Override
    public List<EmployeeContractDto> findAll() {
        List<EmployeeContract> contracts = employeeContractRepository.findAll();
        //List<EmployeeContract> contracts = employeeContractRepository.findAllByIs_deletedIsFalse();
        return contracts.stream().map((EmployeeContractConvert::convertEntityToDto)).collect(Collectors.toList());
    }

    @Override
    public Long create(EmployeeContractDto contractDto) {
        try {
            EmployeeContract contract = setData(contractDto);
            employeeContractRepository.save(contract);
            return contract.getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(EmployeeContractDto contractDto) {
        EmployeeContract contract = setData(contractDto);
        if (contractDto.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (employeeContractRepository.findById(contractDto.getId()).isPresent()) {
            employeeContractRepository.save(contract);
            return contract.getId();
        } else {
            throw new NotFoundException("Employee contract doesn't exist");
        }
    }

    private EmployeeContract setData(EmployeeContractDto contractDto) {
        /*for (long id : contractDto.getEmploymentTypesIds()) {
            if (employmentTypeRepository.findById(id).isEmpty())
                throw new NotFoundException("Employment type doesn't exist");
        }*/
        if (addressRepository.findById(contractDto.getAddressId()).isEmpty() ||
                cityRepository.findById(contractDto.getCityId()).isEmpty() || agencyRepository.findById(contractDto.getAgencyId()).isEmpty() ||
                professionRepository.findById(contractDto.getProfessionId()).isEmpty() || statusRepository.findById(contractDto.getStatusId()).isEmpty())
            throw new NotFoundException("Address, or/and city, or/and agency, or/and profession, or/and status doesn't exist");

        EmployeeContract contract = EmployeeContractConvert.convertDtoToEntity(contractDto);
        contract.setAddress(addressRepository.findById(contractDto.getAddressId()).get());
        contract.setCity(cityRepository.findById(contractDto.getCityId()).get());
        contract.setAgency(agencyRepository.findById(contractDto.getAgencyId()).get());
        contract.setProfession(professionRepository.findById(contractDto.getProfessionId()).get());
        contract.setStatus(statusRepository.findById(contractDto.getStatusId()).get());
        return contract;
    }

    @Override
    public void deleteById(Long id) {
        EmployeeContract contract;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employeeContractRepository.findById(id).isPresent()) {
            contract = employeeContractRepository.findById(id).get();
        } else {
            throw new NotFoundException("Employee contract not found");
        }
        if (!contract.isDeleted()) {
            contract.setDeleted(true);
            employeeContractRepository.save(contract);
        }
    }

    @Override
    public void delete(EmployeeContractDto employeeContractDto) {
        deleteById(employeeContractDto.getId());
    }

    public List<EmployeeContractDto> findActiveForManager() {
        List<EmployeeContract> eeContractListList = employeeContractRepository.findAll();
        return eeContractListList.stream().map((EmployeeContractConvert::convertEntityToDto)).collect(Collectors.toList());
    }


    public List<EmployeeContractDto> findByAgencyId(Long agencyId) {
        List<EmployeeContract> contracts = employeeContractRepository.findByAgencyIdAndIsDeletedFalse(agencyId);
        return contracts.stream().map((EmployeeContractConvert::convertEntityToDto)).collect(Collectors.toList());

    }
}
