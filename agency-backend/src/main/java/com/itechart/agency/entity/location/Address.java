package com.itechart.agency.entity.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itechart.agency.entity.Agency;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
//@ToString
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Street name cannot be null")
    @Size(min = 1, max = 50, message = "Street name must be between 1 and 50 characters")
    @Column(name = "street")
    private String street;

    @NotNull(message = "Building number cannot be null")
    @Size(min = 1, max = 50, message = "Building number must be between 1 and 50 characters")
    @Column(name = "building")
    private String building;

    @Size(max = 50, message = "Apartment number must be shorter than 50 characters")
    @Column(name = "apartment")
    private String apartment;

   /* @NotNull(message = "City for address cannot be null")
    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City city;*/

    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Agency> agencies;

    @Override
    public String toString() {
        return "Address{" +
                "street='" + street + '\'' +
                ", building='" + building + '\'' +
                ", apartment='" + apartment + '\'' +
                ", agencies=" + agencies +
                '}';
    }

    public Address(@NotNull(message = "Street name cannot be null") @Size(min = 1, max = 50, message = "Street name must be between 1 and 50 characters") String street, @NotNull(message = "Building number cannot be null") @Size(min = 1, max = 50, message = "Building number must be between 1 and 50 characters") String building, @NotNull(message = "Apartment number cannot be null") @Size(min = 1, max = 50, message = "Apartment number must be between 1 and 50 characters") String apartment) {
        this.street = street;
        this.building = building;
        this.apartment = apartment;
    }
}
