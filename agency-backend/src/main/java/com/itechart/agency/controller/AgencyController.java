package com.itechart.agency.controller;

import com.itechart.agency.dto.AgencyDto;
import com.itechart.agency.entity.Agency;
import com.itechart.agency.service.AgencyService;
import com.itechart.agency.service.impl.AgencyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/agency")
public class AgencyController {
    @Autowired
    private AgencyService agencyService;

    @PreAuthorize("hasAuthority('SYSADMIN')")
    @GetMapping
    public ResponseEntity<?> getAll() {

        return new ResponseEntity<>(agencyService.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('SYSADMIN')")
    @PostMapping
    public ResponseEntity<?> save(@RequestBody AgencyDto agencyDto) {

        return new ResponseEntity<>(agencyService.create(agencyDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('SYSADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable (name = "id") Long id ) {

        return new ResponseEntity<>(agencyService.findById(id), HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('SYSADMIN')")
    @PutMapping
    public ResponseEntity<?> updateAgency(@RequestBody AgencyDto agencyDto) {
        return new ResponseEntity<>(agencyService.update(agencyDto), HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deactivateAgencyById(@PathVariable (name = "id") Long id) {
        return new ResponseEntity<>(agencyService.deactivateAgencyById(id),HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('SYSADMIN') or hasAuthority('ADMIN')")
    @GetMapping("/deposit/{id}")
    public ResponseEntity<?> getDepositByAgencyId(@PathVariable (name = "id") Long id ) {

        return new ResponseEntity<>(agencyService.getDepositByAgencyId(id), HttpStatus.OK);
    }

}
