package com.itechart.agency.repository;

import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.lists.EmploymentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpertRepository extends JpaRepository<Expert, Long> {

    Expert findByUserId(Long expertUserId);
}
