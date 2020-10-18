package com.itechart.agency.service;

import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.dto.UserDto;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.User;

import java.text.ParseException;
import java.util.List;

public interface UserService {
    UserDto create(final UserDto t);
UserDto createUserWithContract(UserDto userDto,EmployerContractDto employerContractDto);
    UserDto findById(final Long id);

    List<UserDto> findAll();

    UserDto update(final UserDto t);

    void deleteById(final Long id);

    List<String> getRolesByEmail(final String email);

    Agency getAgencyByUserEmail(final String email);

    List<UserDto> getAllByAgencyName(String name);
//    void deleteAllByAgencyId(Long id);
    User getUserByEmail(String email);
    User getUserByEmailForPayment(String email);
    void deactivateAllUsersByAgencyId(Long id);

    Long getUserIdByUserEmail(String email);
}
