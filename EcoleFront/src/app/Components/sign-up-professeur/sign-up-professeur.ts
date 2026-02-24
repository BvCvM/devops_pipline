import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Professeur } from '../../../Models/professeur';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-sign-up-professeur',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up-professeur.html',
  styleUrls: ['./sign-up-professeur.css']
})
export class SignUpProfesseur {
  professeur: Professeur = new Professeur();
  message!: string;
  showAlert!: boolean;
  isSubmitting!: boolean;

  @ViewChild('signInNgForm') signInNgForm!: NgForm;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
