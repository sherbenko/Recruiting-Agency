package com.itechart.agency.dto;

import com.itechart.agency.entity.Agency;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Optional;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployerDto {
    private Long id;
    private String name;
    private Long userId;
    private Long agencyId;
    private Long employerContractId;
    private List<Long> applicationsIds;

    public EmployerDto(Long agencyId,Long userId,String name,Long employerContractId) {
        this.agencyId=agencyId;
        this.userId=userId;
        this.name =name;

    }


//    public static EmployerDto.Builder builder() {
//        return new EmployerDto().new Builder();
//    }

    public class Builder {
        public Builder() {
        }

        public EmployerDto.Builder withId(final Long id) {
            EmployerDto.this.setId(id);
            return this;
        }

        public EmployerDto.Builder withName(final String name) {
            EmployerDto.this.name = name;
            return this;
        }

        public EmployerDto.Builder withUserId(final Long userId) {
            EmployerDto.this.userId = userId;
            return this;
        }

        public EmployerDto.Builder withAgencyId(final Long agencyId) {
            EmployerDto.this.agencyId = agencyId;
            return this;
        }

        public EmployerDto.Builder withEmployerContractId(final Long employerContractId) {
            EmployerDto.this.employerContractId = employerContractId;
            return this;
        }

        public EmployerDto.Builder withApplicationsIds(final List<Long> applicationsIds) {
            EmployerDto.this.applicationsIds = applicationsIds;
            return this;
        }

        public EmployerDto build() {
            return EmployerDto.this;
        }
    }

}
