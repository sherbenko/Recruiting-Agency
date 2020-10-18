package com.itechart.agency.entity.lists;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @NotNull(message = "Role name cannot be null")
    @Size(min = 1, max = 50, message = "Role name must be between 1 and 50 characters")
    @Column(name = "name")
    private String name;

//    @ManyToMany(mappedBy = "roles")
//    private List<User> users;
}
