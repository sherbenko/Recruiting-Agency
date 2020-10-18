package com.itechart.agency.repository;

import com.itechart.agency.entity.Question;
import com.itechart.agency.entity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTypeRepository extends JpaRepository<QuestionType,Long> {

}
