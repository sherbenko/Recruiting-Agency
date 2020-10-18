package com.itechart.agency.dto.converter;

import com.itechart.agency.dto.ExpertDto;
import com.itechart.agency.dto.ExpertForInterviewDto;
import com.itechart.agency.entity.Employer;
import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.User;
import org.modelmapper.ModelMapper;

public class ExpertConvert {

    public static ExpertDto convertEntityToDto(Expert entity) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(entity, ExpertDto.class);
    }

    public static Expert convertDtoToEntity(ExpertDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, Expert.class);
    }

    public static User convertDtoToUserEntity(ExpertDto dto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, User.class);
    }
}
