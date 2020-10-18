package com.itechart.agency.repository;

import com.itechart.agency.entity.InterviewQuestion;
import com.itechart.agency.entity.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion,Long> {

    Optional<List<InterviewQuestion>> findAllByInterviewId(Long interviewId);
}
