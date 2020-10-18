package com.itechart.agency.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "interview_statuses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InterviewStatus {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    @NotNull
    private String name;

    @OneToMany(mappedBy = "interviewStatus", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Interview> interviews;
}
