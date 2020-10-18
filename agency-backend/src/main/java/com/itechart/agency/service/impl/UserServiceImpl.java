package com.itechart.agency.service.impl;


import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.dto.UserDto;
import com.itechart.agency.dto.converter.EmployerContractConvert;
import com.itechart.agency.entity.*;
import com.itechart.agency.entity.lists.Role;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.*;
import com.itechart.agency.service.UserService;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.itechart.agency.repository.AgencyRepository;
import com.itechart.agency.repository.RoleRepository;
import com.itechart.agency.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

@Service("userDetailServiceImpl")
public class UserServiceImpl implements UserDetailsService, UserService {
    private static final String MESSAGE_AFTER_CREATED_AGENCY = "";
    private static final String CREATE_AGENCY_FOR_OWNER = "";
    private static final Properties props = new Properties();

    private final UserRepository userRepository;
    private final AgencyRepository agencyRepository;
    private final RoleRepository roleRepository;
    private final EmployerRepository employerRepository;
    private final EmployerServiceImpl employerService;
    private final EmployeeContractRepository employeeContractRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public UserServiceImpl(UserRepository userRepository, AgencyRepository agencyRepository, RoleRepository roleRepository, EmployerRepository employerRepository, EmployerServiceImpl employerService, EmployeeContractRepository employeeContractRepository) {

        this.userRepository = userRepository;
        this.agencyRepository = agencyRepository;
        this.roleRepository = roleRepository;
        this.employerRepository = employerRepository;
        this.employerService = employerService;
        this.employeeContractRepository = employeeContractRepository;
    }

    public UserDetails loadUserByUsername(String email) {

        User user = getUserByEmail(email);

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));


    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return authorities;
    }

//    @Override
//    public UserDto create(UserDto userDto) {
//        if (userRepository.getUserByEmail(userDto.getEmail()).isEmpty()) {
//            User user = userRepository.save(createUserData(userDto));
//            return UserDto.convertEntityToDto(user);
//        } else {
//            throw new NotFoundException("User with email: " + userDto.getEmail() + " is exist");
//        }
//    }

    @Override
    public UserDto create(UserDto t) {
        return null;
    }

    @Transactional
    @Override
    public UserDto createUserWithContract(UserDto userDto, EmployerContractDto employerContractDto) {


        if (userRepository.getUserByEmail(userDto.getEmail()).isEmpty()) {

            User user = createUserData(userDto);
            System.out.println(user);

            if(employerContractDto==null){
                sendCreatedEmail(user.getEmail(), user.getPassword());
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
            else if (employerContractDto.getContractId() == null) {
                EmployerContract employerContract = EmployerContractConvert.convertDtoToEntity(employerContractDto);
                employerContract.setContractCreationDate(LocalDate.now());
                employerContract.setContractEndDate(LocalDate.now().plusYears(1));
                Employer employer = new Employer();

                Agency agency = agencyRepository.findById(userDto.getAgencyId()).orElseThrow(() -> new NotFoundException("asad"));
                employer.setName(employerContractDto.getName());
                employer.setAgency(agency);
                employer.setUser(user);
                employer.setEmployerContract(employerContract);
                employerRepository.save(employer);

                sendCreatedEmail(user.getEmail(), user.getPassword());
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                userRepository.save(user);

                System.out.println(employer);
            }
           else if (employerContractDto.getContractId() != null) {
                EmployeeContract employeeContract = employeeContractRepository.findById(employerContractDto.getContractId()).orElseThrow(() -> new NotFoundException("Employee with contract id: " + employerContractDto.getContractId() + " not exist"));


                sendCreatedEmail(user.getEmail(), user.getPassword());
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                userRepository.save(user);

                employeeContract.setUser(user);
                employeeContractRepository.save(employeeContract);


                System.out.println(employerContractDto.getContractId());
            }


            return UserDto.convertEntityToDto(user);
        } else {
            throw new NotFoundException("User with email: " + userDto.getEmail() + " not exist");
        }

    }

    @Override
    public UserDto findById(Long id) {
        return UserDto.convertEntityToDto(userRepository.findById(id).filter(user -> user.getIsDeleted().equals(false))
                .orElseThrow(() -> new NotFoundException("User with id:" + id + " not found")));
    }


    @Override
    public List<UserDto> findAll() {

        List<UserDto> usersDto = userRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))
                .stream().filter(u -> u.getIsDeleted().equals(false))
                .map(UserDto::convertEntityToDto)
                .collect(Collectors.toList());

        if (usersDto.isEmpty()) {
            throw new NotFoundException("No users");
        }
        return usersDto;
    }

    @Override
    public UserDto update(UserDto userDto) {
        if (userRepository.findById(userDto.getId()).isPresent()) {
            User user = createUserData(userDto);
            userRepository.save(user);

            return UserDto.convertEntityToDto(user);
        } else {
            throw new NotFoundException("Cannot update user with id:" + userDto.getId() + ".Cause: not found in db");
        }

    }

    @Override
    public void deleteById(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("No user with id:" + id));
        user.setIsDeleted(true);
        user.setIsDeactivated(true);
        userRepository.save(user);
    }

    @Override
    public List<String> getRolesByEmail(String email) {

        return userRepository.getUserByEmail(email).orElseThrow(() -> new NotFoundException("User with email " + email + " not exist")).getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList());
    }

    @Override
    public Agency getAgencyByUserEmail(String email) {
        return userRepository.getUserByEmail(email).orElseThrow(() -> new NotFoundException("No user with " + email + " email")).getAgency();
    }

    @Override
    public List<UserDto> getAllByAgencyName(String name) {
        return userRepository.findAllByAgency_Id(agencyRepository.findByName(name).orElseThrow(() -> new NotFoundException("No agency with name" + name)).getId())

                .stream()
                .filter(user -> user.getIsDeleted().equals(false))
                .map(UserDto::convertEntityToDto).collect(Collectors.toList());
    }

    @Override
    public void deactivateAllUsersByAgencyId(Long id) {
        userRepository.findAllByAgency_Id(id).forEach(user -> user.setIsDeactivated(true));
    }

    /*fix before login*/
    /*get user for login and send email with details if agency deactivated and it's users */
    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.getUserByEmail(email).filter(us -> !us.getIsDeleted()).orElseThrow(() -> new NotFoundException("The username or password you entered is incorrect"));
        if (user.getIsDeactivated()) {
            Agency agency = agencyRepository.findById(user.getAgency().getId()).orElseThrow(() -> new NotFoundException("Agency with id " + user.getAgency().getId()));
            String dateActivate = agency.getActivateDate() != null ?
                    "Last payment date is " + agency.getActivateDate() : "You should activate the agency, fund your account, through your email on the site - 'Pay' tab.";

            try {
                EmailServiceImpl.send(email, agency.getName() + "'s information!", "Your deposit on current time: " + agency.getDeposit() + "$ .\n Your regular payment is: " + agency.getRegularPayment() + "$ .\n" + dateActivate);
            } catch (MessagingException e) {
                throw new NotFoundException("Email incorrect!!!!");
            }

            throw new NotFoundException("\n" +
                    "There is not enough money in the agency's account. A letter with detailed information has been sent to your mail");
        }

        return user;
    }


    @Override
    public User getUserByEmailForPayment(String email) {
        return userRepository.getUserByEmail(email).orElseThrow(() -> new NotFoundException("The username or password you entered is incorrect"));
    }


    private User createUserData(UserDto userDto) {

        User user = UserDto.convertDtoToEntity(userDto);
        user.setAgency(agencyRepository.findById(userDto.getAgencyId()).orElseThrow(() -> new NotFoundException("No agency with id:" + userDto.getAgencyId())));

        if (userDto.getId() == null) {
            String password = generatePassword();
            user.setPassword(password);

        } else
            user.setPassword(userRepository.findById(userDto.getId()).orElseThrow(() -> new NotFoundException("No user with id " + userDto.getId())).getPassword());

        user.setRoles(userDto.getRoles());
        user.setIsDeleted(false);
        user.setIsDeactivated(false);
        return user;
    }

    private void sendCreatedEmail(String email, String password) {
        try {
            EmailServiceImpl.send(email, "User is create!!!", "Your password is\n" + password);
        } catch (MessagingException e) {

            throw new NotFoundException("We cant't found this email.");
        }

    }

    void createUserByRole(String email, Long agencyId, String role) {
        List<Role> roles = new ArrayList<>(List.of(roleRepository.findByName(role)));

        if (userRepository.getUserByEmail(email).isEmpty()) {
            String password = generatePassword();
            userRepository.save(new User(email, bCryptPasswordEncoder.encode((password)), agencyRepository.findById(agencyId).orElseThrow(() -> new NotFoundException("fsdf")), true, false, roles));
            try {
                EmailServiceImpl.send(email, "Agency was registered successfully!!!", "Hi, " + email + " your role is " + role + "\nYour password is\n" + password);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        } else {
            throw new NotFoundException("User with email: " + email + "  not exist");

        }
    }

    private String generatePassword() {
        PasswordGenerator passwordGenerator = new PasswordGenerator();
        return passwordGenerator.generatePassword(10, new CharacterRule(EnglishCharacterData.UpperCase, 1)
                , new CharacterRule(EnglishCharacterData.LowerCase, 1)
                , new CharacterRule(EnglishCharacterData.Digit, 1));
    }

    @Override
    public Long getUserIdByUserEmail(String email) {
        return userRepository.getUserByEmail(email).orElseThrow(() -> new NotFoundException("No user with " + email + " email")).getId();
    }
}
