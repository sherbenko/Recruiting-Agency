package com.itechart.agency.service.impl;

import com.itechart.agency.dto.AgencyDto;
import com.itechart.agency.dto.converter.AgencyConverter;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.location.Address;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.AddressRepository;
import com.itechart.agency.repository.AgencyRepository;
import com.itechart.agency.repository.CityRepository;
import com.itechart.agency.service.AgencyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgencyServiceImpl implements AgencyService {
    private final AgencyRepository agencyRepository;
    private final UserServiceImpl userService;
    private final CityRepository cityRepository;
    private final AddressRepository addressRepository;
    private static final String ROLE_OWNER = "OWNER";
    private static final String ROLE_ADMIN = "ADMIN";


    public AgencyServiceImpl(UserServiceImpl userService, AgencyRepository agencyRepository, CityRepository cityRepository, AddressRepository addressRepository) {
        this.userService = userService;
        this.agencyRepository = agencyRepository;
        this.cityRepository = cityRepository;
        this.addressRepository = addressRepository;
    }

    /*create agency and default user OWNER and ADMIN for new agency*/
    @Transactional
    @Override
    public AgencyDto create(AgencyDto agencyDto) {
        AgencyDto agencyDto1 = createAgencyDto(agencyDto,
                addressRepository.save(new Address(agencyDto.getStreet(), agencyDto.getBuilding(),
                        agencyDto.getApartment())).getId());

            userService.createUserByRole(agencyDto.getOwnerEmail(), agencyDto1.getId(), ROLE_OWNER);
            userService.createUserByRole(agencyDto.getAdminEmail(), agencyDto1.getId(), ROLE_ADMIN);


        return agencyDto1;
    }


    @Override
    public AgencyDto findById(Long id) {
        AgencyDto agencyDto = AgencyConverter.convertEntityToDto(agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Agency with id " + id + " is not exist")));
        Address address = addressRepository.findById(agencyDto.getAddressId()).orElseThrow(() -> new NotFoundException("Not found address with " + agencyDto.getAddressId()));
        agencyDto.setStreet(address.getStreet());
        agencyDto.setBuilding(address.getBuilding());
        agencyDto.setApartment(address.getBuilding());
        agencyDto.setCountryId(cityRepository.findById(agencyDto.getCityId()).orElseThrow(() -> new NotFoundException("Not found city with id: " + agencyDto.getCityId())).getCountry().getId());
        return agencyDto;
    }


    @Override
    public List<AgencyDto> findAll() {
        return agencyRepository.findAll().stream()
                .map(AgencyConverter::convertEntityToDto).collect(Collectors.toList());
    }


    @Override
    public AgencyDto update(AgencyDto agencyDto) {
        return createAgencyDto(agencyDto, agencyDto.getAddressId());
    }

    @Override
    public AgencyDto deactivateAgencyById(Long id) {
        Agency agency = agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("No agency with id: " + id));
        agency.setIsDeleted(true);
        userService.deactivateAllUsersByAgencyId(id);
        return AgencyConverter.convertEntityToDto(agencyRepository.save(agency));
    }

    @Override
    public Double getDepositByAgencyId(Long id) {
        return agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("No agency with id " + id)).getDeposit();
    }

    //fix set double value
    /*fix */
    private AgencyDto createAgencyDto(AgencyDto agencyDto, Long addressId) {
        Agency agency = AgencyConverter.convertDtoToEntity(agencyDto);

        agency.setCity(cityRepository.findById(agencyDto.getCityId()).orElseThrow(() -> new NotFoundException("City with id " + agencyDto.getCityId() + " is not exist")));
        agency.setAddress(addressRepository.findById(addressId).orElseThrow(() -> new NotFoundException("Address with id " + agencyDto.getAddressId() + " is not exist")));
        /*check if agency update set data from db*/
        if (agencyDto.getId() != null) {
            agency.setDeposit(agencyRepository.findById(agencyDto.getId()).orElseThrow(() -> new NotFoundException("Not found agency with id: " + agencyDto.getId())).getDeposit());
            agency.setActivateDate(agencyRepository.findById(agencyDto.getId()).orElseThrow(() -> new NotFoundException("Not found agency with id: " + agencyDto.getId())).getActivateDate());
            agency.setRegularPayment(agencyDto.getRegularPayment());
        } else {
            agency.setDeposit(0.0);
            agency.setIsDeleted(true);
        }

        System.out.println(AgencyConverter.convertEntityToDto(agency));
        return AgencyConverter.convertEntityToDto(agencyRepository.save(agency));
    }


}
