package com.itechart.agency.service.impl;

import com.itechart.agency.entity.lists.Status;
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
public class StatusServiceImpl implements CrudService<Status> {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public Status findById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (statusRepository.findById(id).isPresent()) {
            return statusRepository.findById(id).get();
        } else {
            throw new NotFoundException("Status not found");
        }
    }

    @Override
    public List<Status> findAll() {
        return new ArrayList<>(statusRepository.findAll());
    }

    @Override
    public Long create(Status status) {
        try {
            return statusRepository.save(status).getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(Status status) {
        if (status.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (statusRepository.findById(status.getId()).isPresent()) {
            return statusRepository.save(status).getId();
        } else {
            throw new NotFoundException("Status doesn't exist");
        }
    }

    @Override
    public void deleteById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (statusRepository.findById(id).isPresent()) {
            statusRepository.deleteById(id);
        } else {
            throw new NotFoundException("Status doesn't exist");
        }
    }

    @Override
    public void delete(Status status) {
        deleteById(status.getId());
    }
}
