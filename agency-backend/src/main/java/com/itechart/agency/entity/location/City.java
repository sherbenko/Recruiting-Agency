package com.itechart.agency.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itechart.agency.entity.Agency;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "cities")
@Getter
@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull(message = "City name cannot be null")
    @Size(min = 1, max = 50, message = "City name must be between 1 and 50 characters")
    @Column(name = "name", unique = true)
    private String name;

    @NotNull(message = "City for city cannot be null")
    @ManyToOne
    @JoinColumn(name = "countries_id", referencedColumnName = "id")
    private Country country;

    /*@OneToMany(mappedBy = "addresses", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Address> addresses;*/

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Agency> agencies;
}
