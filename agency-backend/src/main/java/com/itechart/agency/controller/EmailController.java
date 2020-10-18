package com.itechart.agency.controller;

import com.itechart.agency.service.impl.EmailServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/email")
public class EmailController {

    private static final Logger LOGGER = Logger.getLogger(EmailController.class);


    @PreAuthorize("hasAuthority('SECRETARY')")
    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(final @Valid @RequestBody String[] email) throws MessagingException {
        LOGGER.info("REST request. Path:/email/send method: POST. email: to " + email[0] + ", message: " + email[2]);
        EmailServiceImpl.send(email[0], email[1], email[2]);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
