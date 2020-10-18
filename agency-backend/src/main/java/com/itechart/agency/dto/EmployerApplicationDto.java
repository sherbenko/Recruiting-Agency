package com.itechart.agency.dto;

import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class EmployerApplicationDto {

    private Long id;

    private double price;
    private Long agencyId;//
    private Long employerId;//
    private Date creationDate;
    private Date endDate;
    private String statusName;//
    private String professionName;//
    private double salary;
    private String employmentTypeName;//
    private String experienceName;//
    private String ageRestrictionName;//
    //    private Enums.Experience experience;
//    private Enums.AgeRestriction ageRestriction;
    private String countryName;//
    private String cityName;//
    private Long addressId;//
    private String comment;
    private String expertPersonalName;//
    private boolean isDeleted;

    @Override
    public String toString() {
        return "EmployerApplicationDto{" + ", agencyId=" + agencyId + ", employerId=" + employerId +
                ", creationDate=" + creationDate + ", endDate=" + endDate + ", statusName=" + statusName +
                ", professionName=" + professionName + ", salary=" + salary +
                ", employmentTypeName=" + employmentTypeName + ", experience=" + experienceName +
                ", ageRestriction=" + ageRestrictionName + ", countryName=" + countryName + ", cityName=" + cityName +
                ", addressId=" + addressId + ", comment=" + comment + ", expertPersonalName=" + expertPersonalName +
                ", isDeleted=" + isDeleted + '}';
    }
/*
    public static Builder builder() {
        return new EmployerApplicationDto().new Builder();
    }

    public class Builder {
        private Builder() {
        }

        public Builder withId(final Long id) {
            EmployerApplicationDto.this.setId(id);
            return this;
        }

        public Builder withAgencyId(final Long agencyId) {
            EmployerApplicationDto.this.agencyId = agencyId;
            return this;
        }

        public Builder withApplicationName(final String applicationName) {
            EmployerApplicationDto.this.application_name = applicationName;
            return this;
        }

        public Builder withProfessionId(final Long professionId) {
            EmployerApplicationDto.this.professionId = professionId;
            return this;
        }

        public Builder withSalary(final double salary) {
            EmployerApplicationDto.this.salary = salary;
            return this;
        }

        public Builder withEmploymentTypeId(final Long employmentTypeId) {
            EmployerApplicationDto.this.employmentTypeId = employmentTypeId;
            return this;
        }

        public Builder withExpertPersonalName(final String expertPersonalName) {
            EmployerApplicationDto.this.expert_personal_name = expertPersonalName;
            return this;
        }

        public Builder withCreationDate(final Date creationDate) {
            EmployerApplicationDto.this.creation_date = creationDate;
            return this;
        }

        public Builder withEndDate(final Date endDate) {
            EmployerApplicationDto.this.end_date = endDate;
            return this;
        }

        public Builder withStatusId(final Long statusId) {
            EmployerApplicationDto.this.statusId = statusId;
            return this;
        }

        public Builder withFeaturesIds(final List<Long> featuresIds) {
            EmployerApplicationDto.this.featuresIds = featuresIds;
            return this;
        }

        public EmployerApplicationDto build() {
            return EmployerApplicationDto.this;
        }
    }
*/
}
