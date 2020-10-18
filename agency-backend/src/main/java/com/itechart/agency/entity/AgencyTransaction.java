package com.itechart.agency.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Table(name = "agencies_transaction")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AgencyTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "date")
    private LocalDate date;


    @Column(name = "sum")
    private Double sum;

    @NotNull(message = "Agency for user cannot be null")
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "agency_id", referencedColumnName = "id")
    private Agency agency;

    public AgencyTransaction(LocalDate date, Double sum, @NotNull(message = "Agency for user cannot be null") Agency agency) {
        this.date = date;
        this.sum = sum;
        this.agency = agency;
    }
}
