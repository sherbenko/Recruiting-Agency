package com.itechart.agency.service.impl;

import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.AgencyTransaction;
import com.itechart.agency.entity.User;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.AgencyRepository;
import com.itechart.agency.repository.AgencyTransactionRepository;
import com.itechart.agency.repository.UserRepository;
import com.itechart.agency.service.AgencyService;
import com.itechart.agency.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class PaymentService {
    @Autowired
    private AgencyRepository agencyRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AgencyTransactionRepository agencyTransactionRepository;
    @Autowired
    private UserRepository userRepository;

    private static final Integer FIXED_PAYMENT_TERM = 30;
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    Date date = new Date();

    @Scheduled(cron = "*/10 * * * * *")
    /* 8 o'clock of every day.*/
//    @Scheduled(cron = "0 0 8 * * *")
    public void dailyTrackAgencyPayment() {


        agencyRepository.findAll().forEach(agencyTrans -> {

            if (agencyTrans.getActivateDate() != null) {

                if (getCountDaysOfUseSystem(agencyTrans.getActivateDate()) > FIXED_PAYMENT_TERM) {

                    Agency agency = agencyRepository.findById(agencyTrans.getId()).orElseThrow(() -> new NotFoundException("Not found agency with id:" + agencyTrans.getId()));
                    if (agency.getDeposit() <= 0) {

                        deactivateAgencyAndUsers(agency);

                    } else {

                        if (agency.getDeposit() - agency.getRegularPayment() >= 0) {
                            agency.setDeposit(agency.getDeposit() - agency.getRegularPayment());
                            System.out.println("Agency " + agency.getName() + " has deposit after payment " + agency.getDeposit());
                            saveAgencyTransaction(agency.getRegularPayment(), agency.getId());
                            agency.setActivateDate(LocalDate.now());
                            activateAgencyUsers(agency);

                        } else {
                            deactivateAgencyAndUsers(agency);
                        }

                        agencyRepository.save(agency);
                    }
                }
            }


        });

    }
    private Integer getCountDaysOfUseSystem(LocalDate activateDate){
        LocalDateTime now = LocalDateTime.now();

        Long currentMil = now.toInstant(ZoneOffset.ofHours(0)).toEpochMilli();

        Long sd = activateDate.atStartOfDay(ZoneOffset.UTC).toInstant().toEpochMilli();
        long res = currentMil - sd;
        int days = (int) (res / (24 * 60 * 60 * 1000));
        System.out.println(days);
        System.out.println(LocalDate.now());
        return days;
    }

    private void deactivateAgencyAndUsers(Agency agency) {
        agency.setIsDeleted(true);

        List<User> users = userRepository.findAllByAgency_Id(agency.getId());
        for (User user : users
        ) {
            user.setIsDeactivated(true);
            userRepository.save(user);
        }
        agencyRepository.save(agency);
        System.out.println("Agency with name " + agency.getName() + " is banned.Balance :" + agency.getDeposit());
    }

    private void activateAgencyUsers(Agency agency) {
        agency.setIsDeleted(false);
        List<User> users = userRepository.findAllByAgency_Id(agency.getId());
        for (User user : users
        ) {
            user.setIsDeactivated(false);
            userRepository.save(user);
        }
        System.out.println("Agency with name " + agency.getName() + " is Activated .Balance :" + agency.getDeposit());
    }

    private void saveAgencyTransaction(Double regularPayment, Long agencyId) {

        AgencyTransaction agencyTransaction = new AgencyTransaction(LocalDate.now(), regularPayment, agencyRepository.findById(agencyId).orElseThrow(() -> new NotFoundException("No agency with id: "+agencyId)));
        agencyTransactionRepository.save(agencyTransaction);
    }

    public void paymentForUnauthorized(String email, Double sum) {
        System.out.println("User" +email + "--" + sum);
        User user = userService.getUserByEmailForPayment(email);

        if (user.getEmail() != null) {
            Agency agency = userService.getAgencyByUserEmail(email);
            agency.setDeposit(agency.getDeposit() + sum);

            if (agency.getDeposit() >= agency.getRegularPayment() && agency.getIsDeleted()) {
                agency.setDeposit(agency.getDeposit() - agency.getRegularPayment());
                saveAgencyTransaction(agency.getRegularPayment(), agency.getId());

               activateAgencyUsers(agency);
                agency.setActivateDate(java.time.LocalDate.now());


            }
            agencyRepository.save(agency);

        }
    }


}
