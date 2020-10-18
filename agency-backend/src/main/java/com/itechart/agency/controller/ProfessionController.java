package com.itechart.agency.controller;

import com.itechart.agency.entity.lists.Profession;
import com.itechart.agency.service.impl.ProfessionServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/profession")
public class ProfessionController {
    private final ProfessionServiceImpl professionService;
    private static final Logger LOGGER = LoggerFactory.getLogger(ProfessionController.class);

    @Autowired
    public ProfessionController(final ProfessionServiceImpl professionService) {
        this.professionService = professionService;
    }

    //@PreAuthorize("hasAnyAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER') or hasAuthority('EMPLOYER')")
    @GetMapping("/{id}")
    public Profession getOneProfession(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/profession/{} method: GET.", id);
        return professionService.findById(id);

    }

    @GetMapping("/all")
    public List<Profession> getAllProfessions() {
        LOGGER.info("REST request. Path:/profession/all method: GET.");
        return professionService.findAll();
    }

}
