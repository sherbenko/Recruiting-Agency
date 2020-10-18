package com.itechart.agency.controller;

import com.itechart.agency.dto.EmployeeContractDto;
import com.itechart.agency.service.impl.EmployeeContractServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/employeeContract")
public class EmployeeContractController {
    private final EmployeeContractServiceImpl employeeContractService;
    private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeContractController.class);

    @Autowired
    public EmployeeContractController(final EmployeeContractServiceImpl employeeContractService) {
        this.employeeContractService = employeeContractService;
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER')or hasAuthority('EMPLOYEE')")
    @GetMapping("/{id}")
    public EmployeeContractDto getOneEmployeeContract(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employeeContract/{} method: GET.", id);
        return employeeContractService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER')or hasAuthority('EMPLOYEE')")
    @GetMapping("getByUserId/{id}")
    public EmployeeContractDto getOneEmployeeContractByUserId(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employeeContract/getByUserId/{} method: GET.", id);
        return employeeContractService.findByUserId(id);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/edit")
    public ResponseEntity<?> editEmployeeContract(final @Valid @RequestBody EmployeeContractDto employeeContractDto) {
        LOGGER.info("REST request. Path:/employeeContract/edit method: POST. employee contract: {}", employeeContractDto);
        employeeContractService.update(employeeContractDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('EMPLOYER') or hasAuthority('EMPLOYEE') or hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> createEmployeeContract(final @Valid @RequestBody EmployeeContractDto employeeContractDto) {
        LOGGER.info("REST request. Path:/employeeContract/create method: POST. employee contract: {}", employeeContractDto);
        employeeContractService.create(employeeContractDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeEmployeeContract(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employee-contract/{} method: DELETE.", id);
        employeeContractService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAuthority('SECRETARY')")
    @PutMapping("/change-status/{id}/{statusNew}")
    public EmployeeContractDto changeEmployeeContractStatus(@PathVariable("id") Long id, @PathVariable("statusNew") String statusName) {
        LOGGER.info("REST request. Path:/employeeContract/change-status/{id}/{statusId} method: PUT. employeeContractId: " + id + " and statusName: " + statusName);
        if (statusName.contains("-")) {
            String status = statusName.replace('-', ' ');
            return employeeContractService.changeContractStatus(id, status);
        } else return employeeContractService.changeContractStatus(id, statusName);
    }

    @PreAuthorize("hasAuthority('SECRETARY') or hasAuthority('MANAGER')")
    @GetMapping("/getAllByStatus/{status}")
    public List<EmployeeContractDto> getAllEmployeeContractByStatus(@PathVariable("status") String status) {
        LOGGER.info("REST request. Path:/employee-contract/getAllByStatus/" + status + " method: GET.");
        System.out.println(status);
        if (status.contains("-")) {
            String statusN = status.replace('-', ' ');
            return employeeContractService.getContractsByStatus(statusN);
        } else return employeeContractService.getContractsByStatus(status);
    }


    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER')")
    @GetMapping("/all")
    public List<EmployeeContractDto> getAllEmployeeContracts() {
        LOGGER.info("REST request. Path:/employee-contract/all method: GET.");
        return employeeContractService.findAll();
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/all-for-manager/{agencyId}")
    public List<EmployeeContractDto> getAllEmployeeContractsByAgencyId(@PathVariable Long agencyId) {
        LOGGER.info("REST request. Path:/employee-contract/all method: GET.");
        return employeeContractService.findByAgencyId(agencyId);
    }

}
