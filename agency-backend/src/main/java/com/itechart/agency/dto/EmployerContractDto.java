package com.itechart.agency.dto;

import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EmployerContractDto {
    private Long id;

    private Long contractTypeId;
    private String file;
    private double dailyPayment;
   /* private Date contractCreationDate;
    private Date contractEndDate;*/
    private LocalDate contractCreationDate;
    private LocalDate contractEndDate;
    private String name;
    private Long contractId;
    private boolean isSuspended;
    private boolean isDeleted;

    /*public static EmployerContractDto.Builder builder() {
        return new EmployerContractDto().new Builder();
    }

    public class Builder {
        private Builder() {
        }

        public EmployerContractDto.Builder withId(final Long id) {
            EmployerContractDto.this.setId(id);
            return this;
        }

        public EmployerContractDto.Builder withDailyPayment(final double dailyPayment) {
            EmployerContractDto.this.dailyPayment = dailyPayment;
            return this;
        }

        public EmployerContractDto.Builder withContractCreationDate(final Date contractCreationDate) {
            EmployerContractDto.this.contractCreationDate = contractCreationDate;
            return this;
        }

        public EmployerContractDto.Builder withContractEndDate(final Date contractEndDate) {
            EmployerContractDto.this.contractEndDate = contractEndDate;
            return this;
        }

        public EmployerContractDto.Builder withFile(final String file) {
            EmployerContractDto.this.file = file;
            return this;
        }

        public EmployerContractDto.Builder withContractTypeId(final Long contractTypeId) {
            EmployerContractDto.this.contractTypeId = contractTypeId;
            return this;
        }

        public EmployerContractDto.Builder withIsSuspended(final boolean isSuspended) {
            EmployerContractDto.this.isSuspended = isSuspended;
            return this;
        }

        public EmployerContractDto.Builder withIsDeleted(final boolean isDeleted) {
            EmployerContractDto.this.isDeleted = isDeleted;
            return this;
        }

        public EmployerContractDto build() {
            return EmployerContractDto.this;
        }
    }*/
}
