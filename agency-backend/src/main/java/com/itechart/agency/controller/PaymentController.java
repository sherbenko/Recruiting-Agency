package com.itechart.agency.controller;

import com.itechart.agency.dto.PaymentDto;
import com.itechart.agency.service.impl.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/payment ")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public void paymentForUnauthorized(@RequestBody PaymentDto paymentDto) {
        paymentService.paymentForUnauthorized(paymentDto.getEmail(), paymentDto.getSum());


    }

}
