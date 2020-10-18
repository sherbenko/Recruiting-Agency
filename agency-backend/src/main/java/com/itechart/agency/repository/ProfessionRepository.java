package com.itechart.agency.repository;

import com.itechart.agency.entity.lists.Profession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessionRepository extends JpaRepository<Profession, Long>, JpaSpecificationExecutor<Profession> {
    Optional<Profession> findByName(String name);
}
