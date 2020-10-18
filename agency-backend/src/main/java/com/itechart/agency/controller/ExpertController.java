package com.itechart.agency.controller;

import com.itechart.agency.dto.ExpertDto;
import com.itechart.agency.dto.ExpertForInterviewDto;
import com.itechart.agency.dto.converter.ExpertConvert;
import com.itechart.agency.dto.converter.ExpertForDtoConvert;
import com.itechart.agency.entity.Expert;
import com.itechart.agency.entity.User;
import com.itechart.agency.service.ExpertService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/expert")
public class ExpertController {


    private final ExpertService expertService;

    public ExpertController(ExpertService expertService){
        this.expertService = expertService;
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping
    public List<ExpertForInterviewDto> getAll() {
        return expertService.findAll().stream().map(ExpertForDtoConvert::convertEntityToDto).collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @PostMapping()
    public ResponseEntity<?> createExpert(@RequestBody ExpertDto expertDto){
        User user = ExpertConvert.convertDtoToUserEntity(expertDto);
        Expert expert = ExpertConvert.convertDtoToEntity(expertDto);
        expert = expertService.create(user, expert);
        return new ResponseEntity(null, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpert(@PathVariable("id") Long id) {
        expertService.deleteById(id);
        return  new ResponseEntity<>(null, HttpStatus.OK);
    }
}
