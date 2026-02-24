package com.app.etude.etude.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.app.etude.etude.dto.Elevedto;
import com.app.etude.etude.models.Eleve;
import com.app.etude.etude.security.repository.EleveRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EleveServicesImpl implements EleveServices {

    private final EleveRepository eleveRepository;

    // 🔹 Get all students
    @Override
    public List<Elevedto> findAllEleves() {
        return eleveRepository.findAll()
                .stream()
                .map(Elevedto::fromEntity)
                .collect(Collectors.toList());
    }

    // 🔹 Get student by ID
    @Override
    public Elevedto findEleveById(Long id) {
        Eleve eleve = eleveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Élève non trouvé avec l'ID : " + id));
        return Elevedto.fromEntity(eleve);
    }

    // 🔹 Create new student
    @Override
    public Elevedto createEleve(Elevedto eleveDto) {
        Eleve eleve = Elevedto.toEntity(eleveDto);
        Eleve saved = eleveRepository.save(eleve);
        return Elevedto.fromEntity(saved);
    }

    // 🔹 Update existing student
    @Override
    public Elevedto updateEleve(Elevedto eleveDto) {
        Eleve existing = eleveRepository.findById(eleveDto.getId())
                .orElseThrow(() -> new RuntimeException("Élève non trouvé avec l'ID : " + eleveDto.getId()));

        // Update fields (only those that can change)
        existing.setFirstName(eleveDto.getFirstName());
        existing.setLastName(eleveDto.getLastName());
        existing.setEmail(eleveDto.getEmail());
        existing.setAdress(eleveDto.getAdress());
        existing.setPhone(eleveDto.getPhone());
        existing.setDob(eleveDto.getDob());
        existing.setNiveauScolaire(eleveDto.getNiveauScolaire());
        existing.setPassword(eleveDto.getPassword());


        Eleve updated = eleveRepository.save(existing);
        return Elevedto.fromEntity(updated);
    }

    // 🔹 Delete student by ID
    @Override
    public void deleteEleve(Long id) {
        if (!eleveRepository.existsById(id)) {
            throw new RuntimeException("Élève non trouvé avec l'ID : " + id);
        }
        eleveRepository.deleteById(id);
    }



  
}