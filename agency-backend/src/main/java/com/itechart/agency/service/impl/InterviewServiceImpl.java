package com.itechart.agency.service.impl;

import com.itechart.agency.dto.BusyHoursDto;
import com.itechart.agency.dto.InterviewGetDto;
import com.itechart.agency.dto.converter.InterviewGetConverter;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.InterviewStatus;
import com.itechart.agency.exception.BadRequestException;
import com.itechart.agency.entity.*;
import com.itechart.agency.entity.location.Address;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class InterviewServiceImpl {

    public final InterviewRepository interviewRepository;
    public final InterviewStatusRepository interviewStatusRepository;
    public final ManagerRepository managerRepository;
    public final ExpertRepository expertRepository;
    public final EmployeeContractRepository employeeContractRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(InterviewServiceImpl.class);

    @Autowired
    public InterviewServiceImpl(InterviewRepository interviewRepository, InterviewStatusRepository interviewStatusRepository, ManagerRepository managerRepository, ExpertRepository expertRepository, EmployeeContractRepository employeeContractRepository) {
        this.interviewRepository = interviewRepository;
        this.interviewStatusRepository = interviewStatusRepository;
        this.managerRepository = managerRepository;
        this.expertRepository = expertRepository;
        this.employeeContractRepository = employeeContractRepository;
    }


    public Interview create(Interview interview)  {
        Manager manager = managerRepository.findByUserId(interview.getManager().getId());
        interview.setManager(manager);
        interviewRepository.save(interview);
        /*User expertUser = interview.getExpert().getUser();*/
        Long expertId = interview.getExpert().getId();
        Expert expert = expertRepository.findById(expertId).orElseThrow(() -> new NotFoundException("No such emploer"));
        User expertUser = expert.getUser();
        //User employeeUser = interview.getEmployeeContract().getUser();
        String expertEmail = expertUser.getEmail();
        EmployeeContract employeeContract = interview.getEmployeeContract();
        employeeContract = employeeContractRepository.findById(employeeContract.getId()).orElseThrow(() -> new NotFoundException("No such Contract"));
        String employeeEmail = employeeContract.getEmail();
        Agency agency = expertUser.getAgency();
        Address agencyAddressObj = agency.getAddress();
        String agencyCountry = agency.getCity().getCountry().getName();
        String agencyCity = agency.getCity().getName();
        String agencyAddress = agencyAddressObj.getStreet() + " " + agencyAddressObj.getBuilding() + " " + agencyAddressObj.getApartment();
        String startTime = interview.getStartDateTime().toString();
        try {
            EmailServiceImpl.send(employeeEmail, "Invitation to interview", "We invite to to take part int interview by the next address:\n" + agencyCountry + "," + agencyCity + "," + agencyAddress + " by " + startTime + " \nPlease, visit our site to approve invitation and set questions for interview. \n If you have any questions call us by tel: +375293681534\n");
            EmailServiceImpl.send(expertEmail, "Invitation to interview", "We invite to to take part int interview by the next address:\n" + agencyCountry + "," + agencyCity + "," + agencyAddress + " by " + startTime + "\nPlease, visit our site to approve invitation and set questions for interview.\nIf you have any questions call us by tel: +375293681534");
        } catch (MessagingException e) {
            System.out.println(e);
            LOGGER.error("Sending email. Unable to send email. " + e.getCause());
        }
        return interviewRepository.save(interview);
    }

    public List<InterviewGetDto> findByContractId(Long id) {
        List<InterviewGetDto> interviewsGetDto;
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (!interviewRepository.findByEmployeeContractId(id).isEmpty()) {
            interviewsGetDto = (interviewRepository.findByEmployeeContractId(id)).stream().map((InterviewGetConverter::convertEntityToDto)).collect(Collectors.toList());
        } else {
            throw new NotFoundException("Interview not found");
        }
        return interviewsGetDto;
    }


    public Interview findById(Long id) throws NotFoundException { //Why we should return optional????
        Optional<Interview> interviewOptional = interviewRepository.findById(id);
        if (interviewOptional.isPresent()) {
            return interviewOptional.get();
        } else {
            throw new NotFoundException("Interview with id: " + id + " was not found");
        }
    }

    public Interview saveInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    public List<Interview> findAllByAgencyAndManager(Long agencyId, Long managerUserId) {
        Manager manager = managerRepository.findByUserId(managerUserId);
        List<Interview> interviews = interviewRepository.findByAgencyIdAndManagerId(agencyId, manager.getId());
        return interviews;
    }
    /*public List<Interview> findAllByAgencyAndManager(Long agencyId, Long managerId) {
        List<Interview> interviews = interviewRepository.findByAgencyIdAndManagerId(agencyId, managerId);
        return interviews;
    }*/

    public List<Interview> findAllByAgencyAndExpertAndInterviewStatus(Long agencyId, Long expertUserId, Long interviewStatusId) {
        Long expertId = expertRepository.findByUserId(expertUserId).getId();
        List<Interview> interviews = interviewRepository.findByAgencyIdAndExpertIdAndInterviewStatusId(agencyId, expertId, interviewStatusId);
        return interviews;
    }

    public List<Interview> findAllByAgency(Long agencyId) {
        List<Interview> interviews = interviewRepository.findByAgencyId(agencyId);
        return interviews;
    }


    public Long update(Interview interview) {
        interviewRepository.save(interview);
        return null;
    }


    public void deleteById(Long id) {
        interviewRepository.deleteById(id);
    }


    public void delete(Interview interview) {
        interviewRepository.delete(interview);
    }


    public BusyHoursDto getExpertsBusyHours(Long agencyId, Long expertId, Integer year, Integer month, Integer day) {
        List<Object[]> listHours = interviewRepository.getExpertsBusyHours(agencyId, expertId, year, month, day);
        Map<Integer, Integer> map = null;
        Set<Integer> setOfHours = new HashSet();
        Set<Integer> setOfStartHours = new HashSet();
        Set<Integer> setOfEndHours = new HashSet();
        if (listHours != null && !listHours.isEmpty()) {
            map = new HashMap<Integer, Integer>();
            for (Object[] object : listHours) {
                map.put(((Double) object[0]).intValue(), ((Double) object[1]).intValue());
            }
        }
        else {
            return new BusyHoursDto(setOfHours, setOfStartHours, setOfEndHours);
        }
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            Integer start = entry.getKey();
            setOfStartHours.add(start);
            Integer end = entry.getValue();
            setOfEndHours.add(end);
            for (; start <= end; start++) {
                setOfHours.add(start);
            }
        }
        return new BusyHoursDto(setOfHours, setOfStartHours, setOfEndHours);
    }

    public BusyHoursDto getManagersBusyHours(Long agencyId, Long managerUserId, Integer year, Integer month, Integer day) {
        Manager manager = managerRepository.findByUserId(managerUserId);
        List<Object[]> listHours = interviewRepository.getManagersBusyHours(agencyId, manager.getId(), year, month, day);
        Map<Integer, Integer> map = null;
        Set<Integer> setOfHours = new HashSet();
        Set<Integer> setOfStartHours = new HashSet();
        Set<Integer> setOfEndHours = new HashSet();
        if (listHours != null && !listHours.isEmpty()) {
            map = new HashMap<Integer, Integer>();
            for (Object[] object : listHours) {
                map.put(((Double) object[0]).intValue(), ((Double) object[1]).intValue());
            }
        } else {
            return new BusyHoursDto(setOfHours, setOfStartHours, setOfEndHours);
        }
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            Integer start = entry.getKey();
            setOfStartHours.add(start);
            Integer end = entry.getValue();
            setOfEndHours.add(end);
            for (; start <= end; start++) {
                setOfHours.add(start);
            }
        }
        return new BusyHoursDto(setOfHours, setOfStartHours, setOfEndHours);
    }

    public Interview updateInterviewStatus(Long interviewId, Long newStatusId) {
        Interview interview = interviewRepository.findById(interviewId).orElseThrow(() -> new NotFoundException("No interview with id: " + interviewId));
        InterviewStatus interviewStatus = interviewStatusRepository.findById(newStatusId).orElseThrow(() -> new NotFoundException("No interview with id: " + interviewId));
        interview.setInterviewStatus(interviewStatus);
        return interviewRepository.save(interview);
    }

    public BusyHoursDto getEmployeeAppBusyHours(Long agencyId, Long employeeContractId, Integer year, Integer month, Integer day) {
        List<Object[]> listHours = interviewRepository.getEmployeeContrBusyHours(agencyId, employeeContractId, year, month, day);
        Map<Integer, Integer> map = null;
        Set<Integer> setOfHours = new HashSet();
        Set<Integer> setOfStartHours = new HashSet();
        Set<Integer> setOfEndHours = new HashSet();
        if (listHours != null && !listHours.isEmpty()) {
            map = new HashMap<Integer, Integer>();
            for (Object[] object : listHours) {
                map.put(((Double) object[0]).intValue(), ((Double) object[1]).intValue());
            }
        }
        else {
            return new BusyHoursDto(setOfHours, setOfStartHours, setOfEndHours);
        }
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            Integer start = entry.getKey();
            setOfStartHours.add(start);
            Integer end = entry.getValue();
            setOfEndHours.add(end);
            for (; start <= end; start++) {
                setOfHours.add(start);
            }
        }
        return new BusyHoursDto(setOfHours, setOfStartHours, setOfEndHours);
    }
}
