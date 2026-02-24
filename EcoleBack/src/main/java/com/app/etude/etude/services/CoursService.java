package com.app.etude.etude.services;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import com.app.etude.etude.dto.CoursDto;
import com.app.etude.etude.dto.Labelvalueclasse;
import com.app.etude.etude.dto.ListCour;
import com.app.etude.etude.dto.Listeprof;
import com.app.etude.etude.models.Cours;

public interface CoursService {
    // Add a course with file
    Cours addCours(String titre, Long matiereId, MultipartFile file) throws Exception;

    // Get all courses
    List<CoursDto> getAllCourses();

    // Delete course by ID
    void deleteCourse(Long id);

}
