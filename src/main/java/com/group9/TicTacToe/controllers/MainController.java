package com.group9.TicTacToe.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {


    @GetMapping("/")
    public String homePage(){


        return "home";
    }
    @GetMapping("/gameplay")
    public String gameplayPage(){


        return "game";
    }


}
