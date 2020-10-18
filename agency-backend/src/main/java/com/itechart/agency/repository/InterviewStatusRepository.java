package com.itechart.agency.repository;

import com.itechart.agency.entity.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InterviewStatusRepository extends JpaRepository<InterviewStatus,Long> {

}
