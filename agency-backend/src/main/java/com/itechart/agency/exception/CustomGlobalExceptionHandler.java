package com.itechart.agency.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<Object> handleNotFound(Exception ex, HttpServletRequest request) {
        CustomErrorResponse errors = new CustomErrorResponse(LocalDateTime.now(),HttpStatus.NOT_FOUND.value(),ex.getMessage(), request.getRequestURI());

        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<Object> handleBadRequest(Exception ex, HttpServletRequest request) {
        CustomErrorResponse errors = new CustomErrorResponse(LocalDateTime.now(),HttpStatus.BAD_REQUEST.value(),ex.getMessage(), request.getRequestURI());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);

    }
}
