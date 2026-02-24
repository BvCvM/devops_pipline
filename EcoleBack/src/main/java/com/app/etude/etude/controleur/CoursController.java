package com.app.etude.etude.controleur;




import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.etude.etude.dto.CoursDto;
import com.app.etude.etude.models.Cours;
import com.app.etude.etude.services.CoursService;
import java.util.List;


@RestController
@RequestMapping("/api/v1/cours")

public class CoursController {

	 private final CoursService coursService;

	    public CoursController(CoursService coursService) {
	        this.coursService = coursService;
	    }

	    // Add course
	    @PostMapping("/add")
	    public Cours addCours(
	            @RequestParam String titre,
	            @RequestParam Long matiereId,
	            @RequestParam MultipartFile file
	    ) throws Exception {
	        return coursService.addCours(titre, matiereId, file);
	    }

	    // List all courses
	    @GetMapping("/all")
	    public ResponseEntity<List<CoursDto>> getAllCourses() {
	        return ResponseEntity.ok(coursService.getAllCourses());
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
	        coursService.deleteCourse(id);
	        return ResponseEntity.noContent().build();
	    }
	}


