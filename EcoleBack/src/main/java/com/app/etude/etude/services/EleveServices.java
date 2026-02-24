package com.app.etude.etude.services;

import java.util.List;

import com.app.etude.etude.dto.Elevedto;
import com.app.etude.etude.models.Eleve;

public interface EleveServices {
    List<Elevedto> findAllEleves();

    Elevedto findEleveById(Long id);

    Elevedto createEleve(Elevedto eleve);

    Elevedto updateEleve(Elevedto eleve);

    void deleteEleve(Long id);

}
