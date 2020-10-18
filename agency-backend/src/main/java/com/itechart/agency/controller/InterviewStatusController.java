package com.itechart.agency.controller;

import com.itechart.agency.dto.BusyHoursDto;
import com.itechart.agency.dto.InterviewGetDto;
import com.itechart.agency.dto.InterviewSaveDto;
import com.itechart.agency.dto.InterviewStatusDto;
import com.itechart.agency.dto.converter.ExpertForDtoConvert;
import com.itechart.agency.dto.converter.InterviewGetConverter;
import com.itechart.agency.dto.converter.InterviewSaveConverter;
import com.itechart.agency.dto.converter.InterviewStatusConverter;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.InterviewStatus;
import com.itechart.agency.service.InterviewStatusService;
import com.itechart.agency.service.ManagerService;
import com.itechart.agency.service.impl.AgencyServiceImpl;
import com.itechart.agency.service.impl.InterviewServiceImpl;
import com.itechart.agency.service.impl.InterviewStatusServiceImpl;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/interview-status")
public class InterviewStatusController {
    private InterviewStatusServiceImpl interviewStatusService;
    private AgencyServiceImpl agencyService;
    private ManagerService managerService;
    private ModelMapper modelMapper;
    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerContractController.class);

    @Autowired
    public InterviewStatusController(InterviewStatusServiceImpl interviewStatusService, ModelMapper modelMapper) {
        this.interviewStatusService = interviewStatusService;
        this.modelMapper = modelMapper;
    }



    @PreAuthorize("hasAuthority('MANAGER')or hasAuthority('EXPERT')")
    @GetMapping("")
    public ResponseEntity<List<InterviewStatusDto>>/*List<InterviewStatusDto>*/ getAllInterviewStatuses() {
        LOGGER.info("REST request. Path:/interview-status/getAllInterviewStatuses method: GET.getAllInterviewStatuses");
        List<InterviewStatus> interviewStatuses = interviewStatusService.getAllInterviewStatuses();
        List<InterviewStatusDto> interviewStatusDtos = new ArrayList<>();
        interviewStatusDtos = interviewStatuses.stream().map(InterviewStatusConverter::convertEntityToDto).collect(Collectors.toList());

        //return interviewStatusService.getAllInterviewStatuses().stream().map(InterviewStatusConverter::convertEntityToDto).collect(Collectors.toList());

        return new ResponseEntity<List<InterviewStatusDto>>(interviewStatusDtos, HttpStatus.OK);
    }


}
