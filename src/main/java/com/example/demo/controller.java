package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class controller {

    @RequestMapping("/")
    public String saySampleHello() {
        return "Hi I hope I dod this correct";
    }
    
}