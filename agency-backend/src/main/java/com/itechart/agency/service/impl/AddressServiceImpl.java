package com.itechart.agency.service.impl;


import com.itechart.agency.entity.location.Address;
import com.itechart.agency.exception.BadRequestException;
import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.repository.AddressRepository;
import com.itechart.agency.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AddressServiceImpl implements CrudService<Address> {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address findById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (addressRepository.findById(id).isPresent()) {
            return addressRepository.findById(id).get();
        } else {
            throw new NotFoundException("Address not found");
        }
    }

    @Override
    public List<Address> findAll() {
        return new ArrayList<>(addressRepository.findAll());
    }

    @Override
    public Long create(Address address) {
        try {
            return addressRepository.save(address).getId();
        } catch (NoSuchElementException e) {
            throw new BadRequestException("Not valid data");
        }
    }

    @Override
    public Long update(Address address) {
        if (address.getId() <= 0L)
            throw new BadRequestException("Not valid data");
        if (addressRepository.findById(address.getId()).isPresent()) {
            return addressRepository.save(address).getId();
        } else {
            throw new NotFoundException("Address doesn't exist");
        }
    }

    @Override
    public void deleteById(Long id) {
        if (id <= 0L) throw new BadRequestException("Not valid id");
        if (addressRepository.findById(id).isPresent()) {
            addressRepository.deleteById(id);
        } else {
            throw new NotFoundException("Address doesn't exist");
        }
    }

    @Override
    public void delete(Address address) {
        deleteById(address.getId());
    }
}
