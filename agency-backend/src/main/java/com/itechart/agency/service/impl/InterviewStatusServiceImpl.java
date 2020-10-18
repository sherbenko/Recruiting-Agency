package com.itechart.agency.service.impl;

import com.itechart.agency.dto.BusyHoursDto;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.InterviewStatus;
import com.itechart.agency.entity.Manager;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.ExpertRepository;
import com.itechart.agency.repository.InterviewRepository;
import com.itechart.agency.repository.InterviewStatusRepository;
import com.itechart.agency.repository.ManagerRepository;
import com.itechart.agency.service.InterviewStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class InterviewStatusServiceImpl {


    private final InterviewStatusRepository interviewStatusRepository;

    @Autowired
    public InterviewStatusServiceImpl(InterviewStatusRepository interviewStatusRepository) {
        this.interviewStatusRepository = interviewStatusRepository;
    }


    public List<InterviewStatus> getAllInterviewStatuses() {
        return interviewStatusRepository.findAll();
    }

    public InterviewStatus findById(Long interviewStatusId) {
        return interviewStatusRepository.findById(interviewStatusId).orElseThrow(() -> new NotFoundException("No interview status with id:" + interviewStatusId));
    }
}
