package com.app.etude.etude.controleur;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.etude.etude.security.models.User;
import com.app.etude.etude.security.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/User")
@AllArgsConstructor
public class UserControleur {
	
	  private final UserService userService;

	   /*Partie Eleve*/

	    @GetMapping("/listerEleves")
	    public List<User> getEleves() {
	        return userService.getAllEleves();
	    }
	        
	    @DeleteMapping("/supprimer/{id}")
	    public void deleteEleveById(@PathVariable Long id) {
	        userService.deleteEleveById(id);
	    }
	
	    /*Partie Eleve*/
	    
	    @GetMapping("/listerProfes")
	    public List<User> getProfes() {
	        return userService.getAllProfes();
	    }
	        
	    @DeleteMapping("/supprimerprof/{id}")
	    public void deleteProfById(@PathVariable Long id) {
	        userService.deleteProfById(id);
	    }
	    
	    
	    
	    
	    
	/*@GetMapping("/allUser")
    public List<User> findAllUsers()
	{
		return Userservices.findAllUsers();
	}
	@GetMapping("/{id}")
    public User findUserbyid(@PathVariable Long id)
	{
		return Userservices.findUserbyid(id);
	}*/
	
	
}
