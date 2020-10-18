package com.itechart.agency.controller;

import com.itechart.agency.entity.location.Country;
import com.itechart.agency.service.CrudService;
import com.itechart.agency.service.impl.CountryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/country")
public class CountryController {
    @Autowired
    private CountryServiceImpl countryService;
    @PreAuthorize("hasAuthority('SYSADMIN')")
    @GetMapping
    public List<Country> getAll(){
        return countryService.findAll();
    }
    @PostMapping
    public Long create(@RequestBody Country country){
        return countryService.create(country);
    }
}
