package com.app.etude.etude.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.app.etude.etude.dto.CoursDto;
import com.app.etude.etude.models.Cours;
import com.app.etude.etude.models.Matiere;
import com.app.etude.etude.repository.Classesrepository;
import com.app.etude.etude.repository.Coursrepository;
import com.app.etude.etude.repository.Matiererepository;
import com.app.etude.etude.repository.ProfesseurRepository;
import java.io.File;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class CoursServiceImpl implements CoursService {

    private final Coursrepository coursRepository;
    private final Matiererepository matiereRepository;
    private final Classesrepository classesRepository;
    private final ProfesseurRepository professeurRepository;

    private final String UPLOAD_DIR = "C:\\Users\\bacem\\Desktop\\SchoolManagementProject\\Uploads\\";

    public CoursServiceImpl(Coursrepository coursRepository,
                            Matiererepository matiereRepository,
                            Classesrepository classesRepository,
                            ProfesseurRepository professeurRepository) {
        this.coursRepository = coursRepository;
        this.matiereRepository = matiereRepository;
        this.classesRepository = classesRepository;
        this.professeurRepository = professeurRepository;
    }

    @Override
    public Cours addCours(String titre, Long matiereId, MultipartFile file) throws Exception {
        Matiere matiere = matiereRepository.findById(matiereId)
                .orElseThrow(() -> new RuntimeException("Matiere not found"));

        // Save file
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();
        String filePath = UPLOAD_DIR + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // Create course
        Cours cours = new Cours();
        cours.setTitre(titre);
        cours.setMatiere(matiere);
        cours.setFilecours(filePath);

        return coursRepository.save(cours);
    }

    // Get all courses
    public List<CoursDto> getAllCourses() {
        return coursRepository.findAll()
                .stream()
                .map(CoursDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Delete a course
    public void deleteCourse(Long id) {
        coursRepository.deleteById(id);
    }
}