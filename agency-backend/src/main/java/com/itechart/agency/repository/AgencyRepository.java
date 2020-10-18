package com.itechart.agency.repository;

import com.itechart.agency.entity.Agency;
import com.itechart.agency.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgencyRepository extends JpaRepository<Agency,Long> {
    Optional<Agency> findById(Long id);

    Optional<Agency> findByName(String name);


}
