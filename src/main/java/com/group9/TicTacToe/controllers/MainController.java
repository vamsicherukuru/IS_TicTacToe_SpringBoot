package com.group9.TicTacToe.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {


    @GetMapping("/")
    public String homePage(){


        return "home";
    }
    @GetMapping("/gameplay")
    public String gameplayPage(@RequestParam("difficultyLevel") String difficultyLevel,
                               @RequestParam("playerName") String playerName,
                               Model model){
        model.addAttribute("difficultyLevel", difficultyLevel);
        model.addAttribute("playerName", playerName);

        return "game";
    }


}
