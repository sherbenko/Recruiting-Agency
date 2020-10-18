package com.itechart.agency.service.impl;

import com.itechart.agency.dto.QuestionDto;
import com.itechart.agency.dto.QuestionVariantDto;
import com.itechart.agency.dto.converter.QuestionVariantConverter;
import com.itechart.agency.entity.*;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.InterviewQuestionRepository;
import com.itechart.agency.repository.QuestionRepository;
import com.itechart.agency.repository.QuestionTypeRepository;
import com.itechart.agency.repository.QuestionVariantRepository;
import com.itechart.agency.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuestionServiceImpl implements ManagerService {

    private final QuestionRepository questionRepository;
    private final QuestionTypeRepository questionTypeRepository;
    private final QuestionVariantRepository questionVariantRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;


    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, QuestionTypeRepository questionTypeRepository, QuestionTypeRepository questionTypeRepository1, QuestionVariantRepository questionVariantRepository, InterviewQuestionRepository interviewQuestionRepository) {
        this.questionRepository = questionRepository;
        this.questionTypeRepository = questionTypeRepository1;
        this.questionVariantRepository = questionVariantRepository;
        this.interviewQuestionRepository = interviewQuestionRepository;
    }

    public void createQuestion(QuestionDto questionDto, Interview interview) {
        ArrayList interviewList = new ArrayList();
        interviewList.add(interview);
        if (questionDto.getVariants() == null) {
            String questionName = questionDto.getQuestionName();
            QuestionType questionType = questionTypeRepository.findById(1L).orElseThrow(() -> new NotFoundException("Question type with status " + 1L + " not found"));
            Question question = new Question(null, questionName, questionType, null, null/*, interviewList*/);
            Question savedQuestion = questionRepository.save(question);
            interviewQuestionRepository.save(new InterviewQuestion(null, interview, savedQuestion));

        } else {
            String questionName = questionDto.getQuestionName();
            QuestionType questionType = questionTypeRepository.findById(2L).orElseThrow(() -> new NotFoundException("Question type with status " + 2L + " not found"));

            List<QuestionVariantDto> questionVariantDtos = questionDto.getVariants();
            List<QuestionVariant> questionVariants = questionVariantDtos.stream().map(QuestionVariantConverter::toEntity).collect(Collectors.toList());

            Question question = new Question(null, questionName, questionType, questionVariants, null/*, interviewList*/);
            Question savedQuestion = questionRepository.save(question);
            interviewQuestionRepository.save(new InterviewQuestion(null, interview, savedQuestion));


            for(QuestionVariant questionVariant: questionVariants){
                questionVariant.setQuestion(question);
            }
            questionVariantRepository.saveAll(questionVariants);

        }
    }

    public List<Question> getAllQuestionsByInterviewId(Long interviewId){
        List<InterviewQuestion> interviewQuestions = interviewQuestionRepository.findAllByInterviewId(interviewId).orElseThrow(() -> new NotFoundException("No questionInterview for interview id:" + interviewId));
        List<Question> questions = interviewQuestions.stream().map((interviewQuestion -> interviewQuestion.getQuestion())).collect(Collectors.toList());
        return questions;
    }


    public void saveQuestion(Question question) {
        questionRepository.save(question);
    }
}
