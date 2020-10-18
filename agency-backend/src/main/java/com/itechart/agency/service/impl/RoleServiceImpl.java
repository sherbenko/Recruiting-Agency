package com.itechart.agency.service.impl;

import com.itechart.agency.entity.lists.Role;
import com.itechart.agency.repository.RoleRepository;
import com.itechart.agency.service.CrudService;
import com.itechart.agency.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements CrudService<Role> {
@Autowired
private RoleRepository roleRepository;

    @Override
    public Long create(Role role) {
        return null;
    }

    @Override
    public Role findById(Long id) {
        return null;
    }

    @Override
    public List<Role> findAll() {

        return roleRepository.findAll();
    }

    @Override
    public Long update(Role role) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void delete(Role role) {

    }
}
