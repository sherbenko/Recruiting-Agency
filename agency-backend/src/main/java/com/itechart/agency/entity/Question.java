package com.itechart.agency.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itechart.agency.entity.lists.Role;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.poi.hpsf.Variant;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_type_id")
    private QuestionType questionType;

    @OneToMany(mappedBy = "question")
    @JsonIgnore
    private List<QuestionVariant> questionVariants;

    @Column(name="answer")
    @NotNull
    private String answer;

    /*@ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "interview_questions", joinColumns = {
            @JoinColumn(name = "interview_id")}, inverseJoinColumns = {
            @JoinColumn(name = "question_id")})
    private List<Interview> interviews;*/
}
