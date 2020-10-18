package com.itechart.agency.entity.lists;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "statuses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull(message = "Status name cannot be null")
    @Size(min = 1, max = 50, message = "Status name must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Status description cannot be null")
    @Size(min = 1, max = 100, message = "Status description must be between 1 and 100 characters")
    @Column(name = "description")
    private String description;
}
