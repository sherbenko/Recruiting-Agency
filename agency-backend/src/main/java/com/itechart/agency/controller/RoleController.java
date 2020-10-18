package com.itechart.agency.controller;

import com.itechart.agency.entity.lists.Role;
import com.itechart.agency.service.impl.RoleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleServiceImpl roleService;
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<Role> getAll(){
        return roleService.findAll();
    }
}
