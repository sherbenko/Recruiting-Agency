package com.itechart.agency.service;

import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.User;

import java.util.List;

public interface ExpertService {

    List<Expert> findAll();

    Expert create(User user, Expert expert);

    Expert findById(Long id);

    void deleteById(Long id);
}
