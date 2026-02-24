import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth';
import { Eleve, NiveauScolaire } from '../../../Models/eleve';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-up-eleve',
  imports: [FormsModule,CommonModule],
  templateUrl: './sign-up-eleve.html',
  styleUrl: './sign-up-eleve.css'
})
export class SignUpEleve  {
  eleve: Eleve = new Eleve();
  message!: string;
  showAlert!:boolean;
  isSubmitting!:boolean;
  niveaux = Object.values(NiveauScolaire);

  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  constructor(private authService : AuthService){

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
