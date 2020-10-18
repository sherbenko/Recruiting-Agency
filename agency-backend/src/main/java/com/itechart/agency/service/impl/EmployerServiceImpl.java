package com.itechart.agency.service.impl;

import com.itechart.agency.dto.EmployerDto;
import com.itechart.agency.dto.converter.EmployerConvert;
import com.itechart.agency.entity.Employer;
import com.itechart.agency.entity.EmployerApplication;
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
public class EmployerServiceImpl implements CrudService<EmployerDto> {

    private final EmployerRepository employerRepository;
    private final EmployerApplicationRepository employerApplicationRepository;
    private final UserRepository userRepository;
    private final AgencyRepository agencyRepository;
    private final EmployerContractRepository employerContractRepository;

    @Autowired
    public EmployerServiceImpl(EmployerApplicationRepository employerApplicationRepository,
                               UserRepository userRepository, AgencyRepository agencyRepository,
                               EmployerRepository employerRepository, EmployerContractRepository employerContractRepository) {
        this.employerApplicationRepository = employerApplicationRepository;
        this.userRepository = userRepository;
        this.agencyRepository = agencyRepository;
        this.employerRepository = employerRepository;
        this.employerContractRepository = employerContractRepository;
    }

    @Override
    public EmployerDto findById(Long id) {
        EmployerDto employerDto;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerRepository.findById(id).isPresent()) {
            employerDto = EmployerConvert.convertEntityToDto
                    (employerRepository.findById(id).get());
        } else {
            throw new NotFoundException("Employer not found");
        }
        return employerDto;
    }

    @Override
    public List<EmployerDto> findAll() {
        List<Employer> employers = employerRepository.findAll();
        return employers.stream().map((EmployerConvert::convertEntityToDto)).collect(Collectors.toList());
    }

    @Override
    public Long create(EmployerDto employerDto) {
        try {
            Employer employer = setData(employerDto);
            employerRepository.save(employer);
            return employer.getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(EmployerDto employerDto) {
        Employer employer = setData(employerDto);
        if (employerDto.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (employerRepository.findById(employerDto.getId()).isPresent()) {
            employerRepository.save(employer);
            return employer.getId();
        } else {
            throw new NotFoundException("Employer doesn't exist");
        }
    }

    private Employer setData(EmployerDto employerDto) {
        for (long id : employerDto.getApplicationsIds()) {
            if (employerApplicationRepository.findById(id).isEmpty())
                throw new NotFoundException("Employer application doesn't exist");
        }
        if (agencyRepository.findById(employerDto.getAgencyId()).isEmpty() || userRepository.findById(employerDto.getUserId()).isEmpty()
                || employerContractRepository.findById(employerDto.getEmployerContractId()).isEmpty())
            throw new NotFoundException("Agency, or/and user, or/and employer contract doesn't exist");

        Employer employer = EmployerConvert.convertDtoToEntity(employerDto);
        List<EmployerApplication> applications = employerDto.getApplicationsIds().stream()
                .map(a -> employerApplicationRepository.findById(a).get())
                .collect(Collectors.toList());
        employer.setApplications(applications);
        employer.setAgency(agencyRepository.findById(employerDto.getAgencyId()).get());
        employer.setUser(userRepository.findById(employerDto.getUserId()).get());
        employer.setEmployerContract(employerContractRepository.findById(employerDto.getEmployerContractId()).get());
        return employer;
    }

    //мб добавить is_deleted
    @Override
    public void deleteById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerRepository.findById(id).isPresent()) {
            employerRepository.deleteById(id);
        } else {
            throw new NotFoundException("Employer doesn't exist");
        }
    }

    @Override
    public void delete(EmployerDto employerDto) {
        deleteById(employerDto.getId());
    }
}
