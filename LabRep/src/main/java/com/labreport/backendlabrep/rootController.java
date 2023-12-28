package com.labreport.backendlabrep;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class rootController {
    
    @GetMapping(value = {"/", "/{path:[^\\.]*}"})
    public String hello() {
        return "forward:/index.html";
    }
}