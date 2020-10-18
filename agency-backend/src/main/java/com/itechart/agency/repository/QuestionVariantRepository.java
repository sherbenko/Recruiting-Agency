package com.itechart.agency.repository;

import com.itechart.agency.entity.QuestionType;
import com.itechart.agency.entity.QuestionVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVariantRepository extends JpaRepository<QuestionVariant,Long> {
    
}
