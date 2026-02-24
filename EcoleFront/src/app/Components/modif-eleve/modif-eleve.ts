import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Eleve, NiveauScolaire } from '../../../Models/eleve';
import { AuthService } from '../../Services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modif-eleve',
  imports: [FormsModule,CommonModule],
  templateUrl: './modif-eleve.html',
  styleUrl: './modif-eleve.css'
})
export class ModifEleve {

  eleve: Eleve = new Eleve();
  message!: string;
  showAlert!:boolean;
  isSubmitting!:boolean;
  niveaux = Object.values(NiveauScolaire);

  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  constructor(private authService : AuthService ,  private router: Router){

  }
  ngOnInit(): void {

  }

  signUpEleve(): void {
    console.log("Login method called" , this.eleve);
    
    if (this.signInNgForm.invalid) {
      this.signInNgForm.control.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.showAlert = false;
    this.authService.signUpEleve(this.eleve).subscribe({
      next: (response) => {
        
      console.log('response',response)
      this.router.navigate(['/gestionEleve']);
      },
      error: (error) => {
        console.error("Erreur de connexion :", error);


       this.isSubmitting = false;
        this.signInNgForm.resetForm();


        this.message = "something went wrong.";
        this.showAlert = true;
      }
    });
  }
}
 