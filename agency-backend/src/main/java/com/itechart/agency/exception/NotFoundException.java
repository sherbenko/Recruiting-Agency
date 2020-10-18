package com.itechart.agency.exception;

import lombok.Getter;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
public class NotFoundException extends RuntimeException {

    public NotFoundException() {
        super();
    }

    public NotFoundException(String message) {
        super(message);

    }


}
