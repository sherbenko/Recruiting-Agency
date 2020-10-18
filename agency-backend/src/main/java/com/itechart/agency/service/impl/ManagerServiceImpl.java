package com.itechart.agency.service.impl;

import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.User;
import com.itechart.agency.entity.lists.Role;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.ManagerRepository;
import com.itechart.agency.service.ManagerService;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ManagerServiceImpl {

    private final ManagerRepository managerRepository;
    

    @Autowired
    public ManagerServiceImpl( ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }



}
