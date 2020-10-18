package com.itechart.agency.repository;

import com.itechart.agency.entity.EmployerContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployerContractRepository extends JpaRepository<EmployerContract, Long>, JpaSpecificationExecutor<EmployerContract> {

    @Query(value = "SELECT * FROM public.agency_employer_contracts WHERE is_deleted = :false", nativeQuery = true)
    List<EmployerContract> findAllByIs_deletedIsFalse();



}
