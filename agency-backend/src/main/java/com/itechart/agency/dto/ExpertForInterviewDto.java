package com.itechart.agency.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@Setter
@Getter
public class ExpertForInterviewDto {

    private Long id;
    //private Long agencyId;
    private String name;

    public static ExpertForInterviewDto.Builder builder() {
        return new ExpertForInterviewDto().new Builder();
    }
    public class Builder {
        private Builder() {
        }

        public ExpertForInterviewDto.Builder withId(final Long id) {
            ExpertForInterviewDto.this.setId(id);
            return this;
        }

        public ExpertForInterviewDto.Builder withName(final String name) {
            ExpertForInterviewDto.this.name = name;
            return this;
        }

        public ExpertForInterviewDto build() {
            return ExpertForInterviewDto.this;
        }
    }
}
