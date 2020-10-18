package com.itechart.agency.service.impl;

import com.itechart.agency.dto.AgencyTransactionDto;
import com.itechart.agency.dto.UserDto;
import com.itechart.agency.dto.converter.AgencyTransactionConverter;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.AgencyTransaction;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.AgencyRepository;
import com.itechart.agency.repository.AgencyTransactionRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.ui.jasperreports.JasperReportsUtils;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {
    @Autowired
    AgencyTransactionRepository agencyTransactionRepository;
    @Autowired
    private AgencyRepository agencyRepository;



    public List<AgencyTransactionDto> getAllAgenciesForReport() {

        List<AgencyTransactionDto> agencyTransactionDtos = agencyTransactionRepository.findAll().stream().map(AgencyTransactionConverter::convertEntityToDto).collect(Collectors.toList());
        for (AgencyTransactionDto agencyTransactionDto : agencyTransactionDtos
        ) {
            Agency agency = agencyRepository.findById(agencyTransactionDto.getAgency().getId()).orElseThrow(() -> new NotFoundException("Agency with id:" + agencyTransactionDto.getAgency().getId() + "not found"));
            agencyTransactionDto.setAgencyName(agency.getName());
        }
        if (agencyTransactionDtos.isEmpty()) {
            throw new NotFoundException("No Agencies");
        }
        return agencyTransactionDtos;
    }
    public List<AgencyTransactionDto> getAllAgencies(LocalDate start,LocalDate end) {

        List<AgencyTransactionDto> agencyTransactionDtos = agencyTransactionRepository.findAll().stream().map(AgencyTransactionConverter::convertEntityToDto).collect(Collectors.toList());
        List<AgencyTransactionDto> result = new ArrayList<>();
        for (AgencyTransactionDto agencyTransactionDto : agencyTransactionDtos
        ) {
            if(agencyTransactionDto.getDate().isAfter(start) && agencyTransactionDto.getDate().isBefore(end)){
                result.add(agencyTransactionDto);
                Agency agency = agencyRepository.findById(agencyTransactionDto.getAgency().getId()).orElseThrow(() -> new NotFoundException("Agency with id:" + agencyTransactionDto.getAgency().getId() + "not found"));
                agencyTransactionDto.setAgencyName(agency.getName());
            }

        }
        if (result.isEmpty()) {

            AgencyTransactionDto agencyTransactionDto = new AgencyTransactionDto(0L,null,0d,"No agencies",new Agency());
            result.add(agencyTransactionDto);
        }
        return result;
    }

    public Double countProfit(List<AgencyTransactionDto> agencyTransactionDtos){


        return agencyTransactionDtos.stream().map(AgencyTransactionDto::getSum).mapToDouble(Double::doubleValue).sum();

    }
}

