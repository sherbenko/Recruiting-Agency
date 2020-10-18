package com.itechart.agency.service.impl;

import com.itechart.agency.entity.location.Country;
import com.itechart.agency.repository.CountryRepository;
import com.itechart.agency.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CountryServiceImpl implements CrudService<Country> {
    @Autowired
    private CountryRepository countryRepository;
    @Override
    public Long create(Country country) {
        return countryRepository.save(country).getId();
    }

    @Override
    public Country findById(Long id) {
        return null;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    @Override
    public Long update(Country country) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void delete(Country country) {

    }
}
