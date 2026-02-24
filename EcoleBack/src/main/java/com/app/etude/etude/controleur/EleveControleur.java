package com.app.etude.etude.controleur;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.etude.etude.dto.Elevedto;
import com.app.etude.etude.models.Eleve;
import com.app.etude.etude.services.EleveServices;
import com.app.etude.etude.services.MatiereServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/Eleve")
@RequiredArgsConstructor
public class EleveControleur {

    private final EleveServices eleveServices;



  
}