package com.itechart.agency.service.impl;

import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.User;
import com.itechart.agency.entity.lists.Role;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.AgencyRepository;
import com.itechart.agency.repository.ExpertRepository;
import com.itechart.agency.repository.UserRepository;
import com.itechart.agency.service.ExpertService;
import com.itechart.agency.service.UserService;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExpertServiceImpl implements ExpertService {

    private final ExpertRepository expertRepository;
    private final UserRepository userRepository;
    private final AgencyRepository agencyRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    public ExpertServiceImpl(ExpertRepository expertRepository, EmailServiceImpl emailService, UserRepository userRepository, AgencyRepository agencyRepository) {
        this.expertRepository = expertRepository;
        this.userRepository = userRepository;
        this.agencyRepository = agencyRepository;
    }


    public Expert create(User user, Expert expert) {

        PasswordGenerator passwordGenerator = new PasswordGenerator();
        String password = passwordGenerator.generatePassword(10, new CharacterRule(EnglishCharacterData.UpperCase, 1)
                                                                        , new CharacterRule(EnglishCharacterData.LowerCase, 1)
                                                                        , new CharacterRule(EnglishCharacterData.Digit, 1));
        user.setPassword(bCryptPasswordEncoder.encode(password));
        List<Role> roles = new ArrayList<>();
        roles.add(new Role(8L, null));
        user.setRoles(roles);
        user.setIsDeleted(false);
        user.setIsDeactivated(false);
        user.setAgency(agencyRepository.findById(user.getAgency().getId()).orElseThrow(() -> new NotFoundException("No agency with id:" + 1)));
        user = userRepository.save(user);

        expert.setUser(user);
        Expert savedExpert = expertRepository.save(expert);

        try {
            EmailServiceImpl.send(user.getEmail(), "Created account", "You have been just registered as Expert on our site with password: " + password);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return savedExpert;
    }


    public Expert findById(Long id) {
        if (!expertRepository.findById(id).isEmpty()) {
            return expertRepository.findById(id).get();
        } else {
            throw new NotFoundException("No expert with id: " + id);
        }
    }



    public List<Expert> findAll() {
        return expertRepository.findAll();
    }


    public Long update(Expert expert) {
        return null;
    }


    public void deleteById(Long id) {
        Expert expert = findById(id);
        Long userId = expert.getUser().getId();
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isEmpty()) {
             User user = userOptional.get();
             user.setIsDeleted(true);
             userRepository.save(user);
        } else {
            throw new NotFoundException("No user with id: " + id);
        }

    }

    public void delete(Expert expert) {

    }
}
