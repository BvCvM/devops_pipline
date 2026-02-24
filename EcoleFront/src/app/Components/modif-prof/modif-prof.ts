import { Component, ViewChild } from '@angular/core';
import { Professeur } from '../../../Models/professeur';
import { AuthService } from '../../Services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modif-prof',
  imports: [FormsModule,CommonModule],
  templateUrl: './modif-prof.html',
  styleUrl: './modif-prof.css'
})
export class ModifProf {
  professeur: Professeur = new Professeur();
  message!: string;
  showAlert!:boolean;
  isSubmitting!:boolean;

  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  constructor(private authService : AuthService ,  private router: Router){

  }
  ngOnInit(): void {

  }

signUpProfesseur(): void {
  console.log("Sign-up method called", this.professeur);

  if (this.signInNgForm.invalid) {
    this.signInNgForm.control.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  this.showAlert = false;

  this.authService.ajouterprof(this.professeur).subscribe({
    next: (response) => {
      console.log('response', response);
      this.router.navigate(['/gestionProf']);
    },
    error: (error) => {
      console.error("Error during sign-up:", error);
      this.isSubmitting = false;

      this.signInNgForm.resetForm();
      this.message = "Something went wrong.";

      this.showAlert = true;
    }
  });
}
}
 