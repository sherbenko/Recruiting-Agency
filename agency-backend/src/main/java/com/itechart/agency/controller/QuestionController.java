package com.itechart.agency.controller;

import com.itechart.agency.dto.QuestionGetDto;
import com.itechart.agency.dto.converter.InterviewSaveConverter;
import com.itechart.agency.dto.converter.QuestionGetConverter;
import com.itechart.agency.entity.Interview;
import com.itechart.agency.entity.Question;
import com.itechart.agency.service.impl.QuestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/question")
public class QuestionController {

    private final QuestionServiceImpl questionService;

    @Autowired
    public QuestionController(QuestionServiceImpl questionService) {
        this.questionService = questionService;
    }


}
