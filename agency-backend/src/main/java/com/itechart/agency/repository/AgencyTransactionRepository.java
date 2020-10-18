package com.itechart.agency.repository;

import com.itechart.agency.entity.AgencyTransaction;
import com.itechart.agency.entity.location.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgencyTransactionRepository extends JpaRepository<AgencyTransaction,Long> {
}
