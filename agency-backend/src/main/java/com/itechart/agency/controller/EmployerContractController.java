package com.itechart.agency.controller;

import com.itechart.agency.dto.EmployerContractDto;
import com.itechart.agency.service.impl.ContractTypeServiceImpl;
import com.itechart.agency.service.impl.EmployerContractServiceImpl;
import com.itechart.agency.service.impl.FileServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletContext;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/employer-contract")
public class EmployerContractController {
    private final EmployerContractServiceImpl employerContractService;
    private final FileServiceImpl fileService;
    private final ContractTypeServiceImpl contractTypeService;
    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerContractController.class);
    private static final String DIRECTORY = "C:/Users/Public/agency/";
    private static final String DEFAULT_FILE_NAME = "1.docx";


    @Autowired
    public EmployerContractController(final EmployerContractServiceImpl employerContractService, FileServiceImpl fileService,
                                      ContractTypeServiceImpl contractTypeService, ServletContext servletContext) {
        this.employerContractService = employerContractService;
        this.fileService = fileService;
        this.contractTypeService = contractTypeService;
        this.servletContext = servletContext;
    }

    private final ServletContext servletContext;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER')or hasAuthority('EMPLOYER')")
    @GetMapping("/{id}")
    public EmployerContractDto getOneEmployerContract(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employer-contract/{} method: GET.", id);
        return employerContractService.findById(id);
    }

    @PreAuthorize("hasAuthority('SECRETARY') or hasAuthority('EMPLOYER')")
    @GetMapping("/download/{fileName}")
    public ResponseEntity<InputStreamResource> downloadEmployerContract(@PathVariable("fileName") String fileName) throws IOException {

        MediaType mediaType = getMediaTypeForFileName(this.servletContext, fileName);
        System.out.println("fileName: " + fileName);
        System.out.println("mediaType: " + mediaType);

        File file = new File(DIRECTORY + "/" + fileName);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        fileService.downloadFile(1L, fileName);

        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength(file.length()) //
                .body(resource);
    }

    public static MediaType getMediaTypeForFileName(ServletContext servletContext, String fileName) {
        String mineType = servletContext.getMimeType(fileName);
        try {
            return MediaType.parseMediaType(mineType);
        } catch (Exception e) {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

   /* @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<?> editEmployerContract(final @Valid @RequestBody EmployerContractDto employerContractDto) {
        LOGGER.info("REST request. Path:/employer-contract/edit method: POST. employer contract: {}", employerContractDto);
        employerContractService.update(employerContractDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/create")
    public ResponseEntity<?> createEmployerContract(final @Valid @RequestBody EmployerContractDto employerContractDto) {
        LOGGER.info("REST request. Path:/employer-contract/create method: POST. employer contract: {}", employerContractDto);
        employerContractService.create(employerContractDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeEmployerContract(@PathVariable("id") Long id) {
        LOGGER.info("REST request. Path:/employer-contract/{} method: DELETE.", id);
        employerContractService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/

//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER')")
//    @GetMapping("/all")
//    public ResponseEntity<?> getAllEmployerContracts() {
//        LOGGER.info("REST request. Path:/employer-contract/all method: GET.");
//        final List<EmployerContractDto> employerContractDtos = employerContractService.findAll();
//        return new ResponseEntity<>(employerContractDtos, HttpStatus.OK);
//    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('SECRETARY') or hasAuthority('MANAGER')")
    @GetMapping("/types")
    public ResponseEntity<?> getAllEmployerContractsTypes() {
        return new ResponseEntity<>(contractTypeService.findAll(), HttpStatus.OK);
    }


}
