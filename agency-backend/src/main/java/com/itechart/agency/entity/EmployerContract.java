package com.itechart.agency.entity;

import com.itechart.agency.entity.lists.ContractType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;



@Entity
@Table(name = "agency_employer_contracts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployerContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Contract type cannot be null")
    @ManyToOne
    @JoinColumn(name = "contract_type_id", referencedColumnName = "id")
    private ContractType contractType;

    @NotNull(message = "File in contract cannot be null")
    @Column(name = "file")
    private String file;

    @NotNull(message = "Daily payment in contract cannot be null")
    @Column(name = "daily_payment")
    private double dailyPayment;

    @NotNull(message = "Contract creation date cannot be null")
    @Column(name = "contract_creation_date")
    private LocalDate contractCreationDate;

    @NotNull(message = "Contract end date cannot be null")
    @Column(name = "contract_end_date")
    private LocalDate contractEndDate;

    @NotNull(message = "Field is_suspended in contract cannot be null")
    @Column(name = "is_suspended")
    private boolean isSuspended;

    @NotNull(message = "Field is_deleted in contract cannot be null")
    @Column(name = "is_deleted")
    private boolean isDeleted;
}
