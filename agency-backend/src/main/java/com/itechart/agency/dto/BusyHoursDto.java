package com.itechart.agency.dto;

import com.itechart.agency.entity.User;
import com.itechart.agency.entity.lists.Role;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BusyHoursDto {
    private Set<Integer> busyHours;
    private Set<Integer> busyStartHours;
    private Set<Integer> busyEndHours;

}
