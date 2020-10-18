package com.itechart.agency.entity.lists;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "experience")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Experience name cannot be null")
    @Size(min = 1, max = 50, message = "Experience name  must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;
}
