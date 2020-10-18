package com.itechart.agency.service.impl;

import com.itechart.agency.entity.lists.Profession;
import com.itechart.agency.exception.BadRequestException;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.*;
import com.itechart.agency.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProfessionServiceImpl implements CrudService<Profession> {

    private final ProfessionRepository professionRepository;

    @Autowired
    public ProfessionServiceImpl(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    @Override
    public Profession findById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (professionRepository.findById(id).isPresent()) {
            return professionRepository.findById(id).get();
        } else {
            throw new NotFoundException("Profession not found");
        }
    }

    @Override
    public List<Profession> findAll() {
        return new ArrayList<>(professionRepository.findAll());
    }

    @Override
    public Long create(Profession profession) {
        try {
            return professionRepository.save(profession).getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(Profession profession) {
        if (profession.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (professionRepository.findById(profession.getId()).isPresent()) {
            return professionRepository.save(profession).getId();
        } else {
            throw new NotFoundException("Profession doesn't exist");
        }
    }

    @Override
    public void deleteById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (professionRepository.findById(id).isPresent()) {
            professionRepository.deleteById(id);
        } else {
            throw new NotFoundException("Profession doesn't exist");
        }
    }

    @Override
    public void delete(Profession profession) {
        deleteById(profession.getId());
    }
}
