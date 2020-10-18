package com.itechart.agency.repository;

import com.itechart.agency.entity.EmployeeContract;
import com.itechart.agency.entity.lists.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeContractRepository extends JpaRepository<EmployeeContract, Long> {
    @Query(value = "SELECT * FROM public.agency_employee_contracts WHERE is_deleted = :false", nativeQuery = true)
    List<EmployeeContract> findAllByIs_deletedIsFalse();

    List<EmployeeContract> findByAgencyIdAndIsDeletedFalse(Long agencyId);

    List<EmployeeContract> findByStatus(Status status);

    Optional<EmployeeContract> findByUserId(Long id);

    /*List<EmployeeContract> findAllByAgencyIdAndByIs_deletedIsFalse();*/
}
