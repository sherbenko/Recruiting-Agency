package com.itechart.agency.controller;

import com.itechart.agency.entity.lists.Status;
import com.itechart.agency.service.impl.StatusServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/status")
public class StatusController {
    private final StatusServiceImpl statusService;
    private static final Logger LOGGER = LoggerFactory.getLogger(StatusController.class);

    @Autowired
    public StatusController(final StatusServiceImpl statusService) {
        this.statusService = statusService;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER') or hasAuthority('EMPLOYER')")
    @GetMapping("/{id}")
    public Status getOneStatus(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/status/{} method: GET.", id);
        return statusService.findById(id);

    }

    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER') or hasAuthority('EMPLOYER')")
    @GetMapping("/all")
    public List<Status> getAllProfessions() {
        LOGGER.info("REST request. Path:/status/all method: GET.");
        return statusService.findAll();
    }
}
