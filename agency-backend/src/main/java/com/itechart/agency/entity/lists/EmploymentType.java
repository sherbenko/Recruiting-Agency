package com.itechart.agency.entity.lists;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "employment_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmploymentType {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull(message = "Employment type cannot be null")
    @Size(min = 1, max = 50, message = "Employment type must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;
}
