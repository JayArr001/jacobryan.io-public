package io.jacobryan.Application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController
{

    //For deeper nesting I'd use a different regex like [/*]* but this will do for my SPA
    @GetMapping(value = {
            "/{path:^(?!api$)[^\\.]*}",
            "/*/{path:^(?!api$)[^\\.]*}",
            "/*/*/{path:^(?!api$)[^\\.]*}",
            "/*/*/*/{path:^(?!api$)[^\\.]*}",
            "/error"
    })
    public String forwardNested() {
        return "forward:/index.html";
    }
}