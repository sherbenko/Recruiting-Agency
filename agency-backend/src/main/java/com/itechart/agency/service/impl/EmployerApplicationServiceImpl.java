package com.itechart.agency.service.impl;

import com.itechart.agency.dto.EmployerApplicationDto;
import com.itechart.agency.dto.EmployerApplicationForManagerDto;
import com.itechart.agency.dto.converter.EmployerApplicationConvert;
import com.itechart.agency.dto.converter.EmployerApplicationForManagerConvert;
import com.itechart.agency.entity.EmployerApplication;
import com.itechart.agency.exception.BadRequestException;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.*;
import com.itechart.agency.service.CrudService;
import com.itechart.agency.service.EmployerApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class EmployerApplicationServiceImpl implements EmployerApplicationService, CrudService<EmployerApplicationDto> {

    private final EmployerApplicationRepository employerApplicationRepository;
    private final AgencyRepository agencyRepository;
    private final EmployerRepository employerRepository;
    private final EmploymentTypeRepository employmentTypeRepository;
    private final ProfessionRepository professionRepository;
    private final StatusRepository statusRepository;
    private final AddressRepository addressRepository;
    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;
    private final AgeRestrictionRepository ageRestrictionRepository;
    private final ExperienceRepository experienceRepository;

    @Autowired
    public EmployerApplicationServiceImpl(EmployerApplicationRepository employerApplicationRepository,
                                          AgencyRepository agencyRepository, EmployerRepository employerRepository,
                                          AddressRepository addressRepository, CityRepository cityRepository,
                                          EmploymentTypeRepository employmentTypeRepository, CountryRepository countryRepository,
                                          ProfessionRepository professionRepository, StatusRepository statusRepository,
                                          AgeRestrictionRepository ageRestrictionRepository, ExperienceRepository experienceRepository) {
        this.employerApplicationRepository = employerApplicationRepository;
        this.agencyRepository = agencyRepository;
        this.employerRepository = employerRepository;
        this.employmentTypeRepository = employmentTypeRepository;
        this.professionRepository = professionRepository;
        this.statusRepository = statusRepository;
        this.cityRepository = cityRepository;
        this.addressRepository = addressRepository;
        this.countryRepository = countryRepository;
        this.ageRestrictionRepository = ageRestrictionRepository;
        this.experienceRepository = experienceRepository;
    }

    @Override
    public List<EmployerApplicationDto> getApplicationsByStatus(String status) {
        if (statusRepository.findByName(status).isEmpty())
            throw new NotFoundException("Status doesn't exist");
        List<EmployerApplication> applicationList = employerApplicationRepository.findByStatus(statusRepository.findByName(status).get());
        return applicationList.stream().map((EmployerApplicationConvert::convertEntityToDto)).collect(Collectors.toList());
    }

    @Override
    public EmployerApplicationDto changeApplicationStatus(Long applicationId, String newStatus) {
        if (employerApplicationRepository.findById(applicationId).isEmpty() || statusRepository.findByName(newStatus).isEmpty())
            throw new NotFoundException("Employer application or/and status doesn't exist");
        else {
            EmployerApplication employerApplication = find(applicationId);
            employerApplication.setStatus(statusRepository.findByName(newStatus).get());
            return EmployerApplicationConvert.convertEntityToDto(employerApplicationRepository.save(employerApplication));
        }
    }

    private EmployerApplication find(Long id) {
        EmployerApplication application;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerApplicationRepository.findById(id).isPresent()) {
            application = employerApplicationRepository.findById(id).get();
        } else {
            throw new NotFoundException("Employer application not found");
        }
        return application;
    }

    @Override
    public EmployerApplicationDto findById(Long id) {
        EmployerApplicationDto applicationDto;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerApplicationRepository.findById(id).isPresent()) {
            applicationDto = EmployerApplicationConvert.convertEntityToDto
                    (employerApplicationRepository.findById(id).get());
        } else {
            throw new NotFoundException("Employer application not found");
        }
        return applicationDto;
    }

    @Override
    public List<EmployerApplicationDto> findAll() {
        List<EmployerApplication> applicationList = employerApplicationRepository.findAll();
        return applicationList.stream().map((EmployerApplicationConvert::convertEntityToDto)).collect(Collectors.toList());
    }

    public List<EmployerApplicationForManagerDto> findAllForManagerByAgency(Long agencyId) {
        List<EmployerApplication> applicationList = employerApplicationRepository.findByAgencyIdAndIsDeletedFalse(agencyId);
        return applicationList.stream().map((EmployerApplicationForManagerConvert::convertEntityToDto)).collect(Collectors.toList());
    }

    @Override
    public Long create(EmployerApplicationDto applicationDto) {
        try {
            EmployerApplication application = setData(applicationDto);
            employerApplicationRepository.save(application);
            return application.getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(EmployerApplicationDto applicationDto) {
        EmployerApplication application = setData(applicationDto);
        application.setId(applicationDto.getId());
        if (applicationDto.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (employerApplicationRepository.findById(applicationDto.getId()).isPresent()) {
            employerApplicationRepository.save(application);
            return application.getId();
        } else {
            throw new NotFoundException("Employer application doesn't exist");
        }
    }


    private EmployerApplication setData(EmployerApplicationDto applicationDto) {
        if (agencyRepository.findById(applicationDto.getAgencyId()).isEmpty()) System.out.println("agency");
        if (employerRepository.findById(applicationDto.getEmployerId()).isEmpty()) System.out.println("employer");
        if (employmentTypeRepository.findByName(applicationDto.getEmploymentTypeName()).isEmpty()) System.out.println("empl type");
        if (countryRepository.findByName(applicationDto.getCountryName()).isEmpty()) System.out.println("country");
        if (cityRepository.findByName(applicationDto.getCityName()).isEmpty()) System.out.println("city");
        if (professionRepository.findByName(applicationDto.getProfessionName()).isEmpty()) System.out.println("profession");
        if (statusRepository.findByName(applicationDto.getStatusName()).isEmpty()) System.out.println("status");
        if (addressRepository.findById(applicationDto.getAddressId()).isEmpty()) System.out.println("address");
        if (ageRestrictionRepository.findByName(applicationDto.getAgeRestrictionName()).isEmpty()) System.out.println("age");
        if (experienceRepository.findByName(applicationDto.getExperienceName()).isEmpty()) System.out.println("experience");

        if (agencyRepository.findById(applicationDto.getAgencyId()).isEmpty() || employerRepository.findById(applicationDto.getEmployerId()).isEmpty()
                || employmentTypeRepository.findByName(applicationDto.getEmploymentTypeName()).isEmpty() || countryRepository.findByName(applicationDto.getCountryName()).isEmpty()
                || professionRepository.findByName(applicationDto.getProfessionName()).isEmpty() || statusRepository.findByName(applicationDto.getStatusName()).isEmpty()
                || addressRepository.findById(applicationDto.getAddressId()).isEmpty() || cityRepository.findByName(applicationDto.getCityName()).isEmpty()
                || ageRestrictionRepository.findByName(applicationDto.getAgeRestrictionName()).isEmpty() || experienceRepository.findByName(applicationDto.getExperienceName()).isEmpty())
            throw new NotFoundException("Agency, or/and employer, or/and employment type, or/and profession, or/and status, " +
                    "or/and country, or/and address, or/and city, or/and experience, or/and age restriction  doesn't exist");

        EmployerApplication application = new EmployerApplication();
        application.setCreationDate(applicationDto.getCreationDate());
        application.setEndDate(applicationDto.getEndDate());
        application.setSalary(applicationDto.getSalary());
        application.setComment(applicationDto.getComment());
        application.setDeleted(false);
        application.setPrice(applicationDto.getPrice());
        //EmployerApplication application = EmployerApplicationConvert.convertDtoToEntity(applicationDto);
        application.setExperience(experienceRepository.findByName(applicationDto.getExperienceName()).get());
        application.setAgeRestriction(ageRestrictionRepository.findByName(applicationDto.getAgeRestrictionName()).get());
        application.setAgency(agencyRepository.findById(applicationDto.getAgencyId()).get());
        application.setEmployer(employerRepository.findById(applicationDto.getEmployerId()).get());
        application.setEmploymentType(employmentTypeRepository.findByName(applicationDto.getEmploymentTypeName()).get());
        application.setProfession(professionRepository.findByName(applicationDto.getProfessionName()).get());
        application.setStatus(statusRepository.findByName(applicationDto.getStatusName()).get());
        application.setCountry(countryRepository.findByName(applicationDto.getCountryName()).get());
        application.setCity(cityRepository.findByName(applicationDto.getCityName()).get());
        application.setAddress(addressRepository.findById(applicationDto.getAddressId()).get());
        return application;
    }

    @Override
    public void deleteById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (employerApplicationRepository.findById(id).isPresent()) {
            EmployerApplication app = employerApplicationRepository.findById(id).get();
            app.setDeleted(true);
            employerApplicationRepository.save(app);
        } else {
            throw new NotFoundException("Employer application doesn't exist");
        }
    }

    @Override
    public void delete(EmployerApplicationDto application) {
        deleteById(application.getId());
    }
}
