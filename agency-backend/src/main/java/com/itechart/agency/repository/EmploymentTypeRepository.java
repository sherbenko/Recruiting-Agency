package com.itechart.agency.repository;

import com.itechart.agency.entity.lists.EmploymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmploymentTypeRepository extends JpaRepository<EmploymentType, Long>, JpaSpecificationExecutor<EmploymentType> {
    Optional<EmploymentType> findByName(String name);
}
