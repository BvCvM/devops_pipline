import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Authrequest } from '../../../Models/authrequest';
import { AuthService } from '../../Services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule , CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  authrequest: Authrequest = new Authrequest();


  constructor(private authService : AuthService, private router: Router) { }


  ngOnInit(): void {
    // Initialization logic can go here
  }


  showAlert = false;
  message = '';
  isSubmitting = false;




  login(): void {
    console.log("Login method called" , this.authrequest);
    if (this.signInNgForm.invalid) {
      this.signInNgForm.control.markAllAsTouched();
      return;
    }


    this.isSubmitting = true;
    this.showAlert = false;


    this.authService.signIn(this.authrequest).subscribe({
      next: (response) => {
        const token = response.accessToken;
        this.router.navigateByUrl('/dashboard');
        //const decodedToken = jwtDecode<CustomJwtPayload>(token);


        //const role = decodedToken.authorities[0].authority;
        //localStorage.setItem("role", role);


        //this._router.navigateByUrl('dashboard/welcome');
      },
      error: (error) => {
        console.error("Erreur de connexion :", error);


        this.isSubmitting = false;
        this.signInNgForm.resetForm();


        this.message = "Email ou mot de passe incorrect.";
        this.showAlert = true;
      }
    });
  }
}






