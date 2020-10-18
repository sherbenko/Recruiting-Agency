package com.itechart.agency.dto;

import com.itechart.agency.entity.User;
import com.itechart.agency.entity.lists.Role;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class ExpertDto {

    private Long id;
    private String email;
    private Long agencyId;
    private String expertName;


}
