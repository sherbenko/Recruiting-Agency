package com.itechart.agency.controller;

import com.itechart.agency.dto.EmployerDto;
import com.itechart.agency.service.impl.EmployerServiceImpl;
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
@RequestMapping("/employer")
public class EmployerController {
    private final EmployerServiceImpl employerService;
    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerController.class);

    @Autowired
    public EmployerController(final EmployerServiceImpl employerService) {
        this.employerService = employerService;
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER') or hasAuthority('EMPLOYER')")
    @GetMapping("/{id}")
    public EmployerDto getOneEmployer(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employer/{} method: GET.", id);
        return employerService.findById(id);

    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<?> editEmployer(final @Valid @RequestBody EmployerDto employerDto) {
        LOGGER.info("REST request. Path:/employer/edit method: POST. employer: {}", employerDto);
        employerService.update(employerDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/create")
    public ResponseEntity<?> createEmployer(final @Valid @RequestBody EmployerDto employerDto) {
        LOGGER.info("REST request. Path:/employer/create method: POST. employer: {}", employerDto);
        employerService.create(employerDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("delete/{id}")
    public void removeEmployer(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employer/{} method: DELETE.", id);
        employerService.deleteById(id);
    }

    //preauthorize ???
    @GetMapping("/all")
    public ResponseEntity<?> getAllEmployers() {
        LOGGER.info("REST request. Path:/employer/all method: GET.");
        final List<EmployerDto> employerDtos = employerService.findAll();
        return new ResponseEntity<>(employerDtos, HttpStatus.OK);
    }

}
