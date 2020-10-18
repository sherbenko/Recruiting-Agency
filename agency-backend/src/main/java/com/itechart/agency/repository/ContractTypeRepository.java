package com.itechart.agency.repository;

import com.itechart.agency.entity.lists.ContractType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractTypeRepository extends JpaRepository<ContractType, Long>, JpaSpecificationExecutor<ContractType> {
}
