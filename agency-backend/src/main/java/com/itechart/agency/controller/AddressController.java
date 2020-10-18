package com.itechart.agency.controller;


import com.itechart.agency.dto.EmployerApplicationDto;
import com.itechart.agency.entity.location.Address;
import com.itechart.agency.service.impl.AddressServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/address")
public class AddressController {
    private final AddressServiceImpl addressService;
    private static final Logger LOGGER = LoggerFactory.getLogger(AddressController.class);

    @Autowired
    public AddressController(final AddressServiceImpl addressService) {
        this.addressService = addressService;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER') or hasAuthority('EMPLOYER')")
    @GetMapping("/{id}")
    public Address getOneAddress(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/address/{} method: GET.", id);
        return addressService.findById(id);

    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYER') or hasAuthority('EMPLOYEE') or hasAuthority('MANAGER') or hasAuthority('SYSADMIN') ")
    @PostMapping("/create")
    public Long createAddress(final @Valid @RequestBody Address address) {
        LOGGER.info("REST request. Path:/address/create method: POST. " + address.toString());
        return addressService.create(address);
    }

    @GetMapping("/all")
    public List<Address> getAllAddresss() {
        LOGGER.info("REST request. Path:/address/all method: GET.");
        return addressService.findAll();
    }

}
