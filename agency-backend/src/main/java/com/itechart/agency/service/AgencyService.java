package com.itechart.agency.service;

import com.itechart.agency.dto.AgencyDto;
import com.itechart.agency.dto.UserDto;

import java.util.List;

public interface AgencyService {
    AgencyDto create(final AgencyDto t);

    AgencyDto findById(final Long id);

    List<AgencyDto> findAll();

    AgencyDto update(final AgencyDto t);

    AgencyDto deactivateAgencyById(Long id);
    Double getDepositByAgencyId(final Long id);
}
