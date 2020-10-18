package com.itechart.agency.repository;

import com.itechart.agency.entity.location.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City,Long> {
    List<City> getAllByCountryId(Long id);
    Optional<City> findByName(String name);
}
