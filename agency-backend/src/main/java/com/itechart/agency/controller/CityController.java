package com.itechart.agency.controller;

import com.itechart.agency.entity.location.City;
import com.itechart.agency.entity.location.Country;
import com.itechart.agency.service.impl.CityServiceImpl;
import com.itechart.agency.service.impl.CountryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/city")
public class CityController {
    private final CityServiceImpl cityService;

    public CityController(CityServiceImpl cityService) {
        this.cityService = cityService;
    }

    @PreAuthorize("hasAuthority('SYSADMIN')")
    @GetMapping
    public List<City> getAll()   {
        return cityService.findAll();
    }

    @PreAuthorize("hasAuthority('SYSADMIN')")
    @GetMapping("/{id}")
    public List<City> getAllByCountryId(@PathVariable(name = "id") Long id) {
        return cityService.findCityByCountryId(id);
    }
}
