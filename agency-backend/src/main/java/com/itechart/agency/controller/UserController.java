package com.itechart.agency.controller;


import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.dto.UserDto;
import com.itechart.agency.entity.EmployerAndContract;
import com.itechart.agency.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
//    @GetMapping
//    public List<UserDto> getAll() {
//        return userService.findAll();
//    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public UserDto findById(@PathVariable(name = "id") Long id) {

        return userService.findById(id);

    }

//    @PreAuthorize("hasAuthority('ADMIN')")
//    @PostMapping
//    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
//
//        return new ResponseEntity<>(userService.create(userDto), HttpStatus.OK);
//    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody EmployerAndContract employerAndContract) {
        System.out.println(
                employerAndContract.getUser()
        );
        System.out.println(employerAndContract.getContract());
//        System.out.println(employerAndContract.getEmployerContract());
        return new ResponseEntity<>(userService.createUserWithContract(employerAndContract.getUser(),employerAndContract.getContract()),HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {

        return new ResponseEntity<>(userService.update(userDto), HttpStatus.OK);

    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) {
        userService.deleteById(id);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<UserDto> getAllByAgencyName(@RequestParam (value="name") String name) {
        return userService.getAllByAgencyName(name);
    }


}
