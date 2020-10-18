package com.itechart.agency.service.impl;

import com.itechart.agency.entity.location.City;
import com.itechart.agency.repository.CityRepository;
import com.itechart.agency.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CrudService<City> {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public Long create(City city) {
        return null;
    }

    @Override
    public City findById(Long id) {
        return null;
    }

    @Override
    public List<City> findAll() {
        return cityRepository.findAll();
    }

    @Override
    public Long update(City city) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void delete(City city) {

    }

    public List<City> findCityByCountryId(Long id) {
        return cityRepository.getAllByCountryId(id);
    }
}
