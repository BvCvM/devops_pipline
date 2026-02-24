import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth';
import { Parent } from '../../../Models/parent'; 
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-parent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up-parent.html',
  styleUrls: ['./sign-up-parent.css']
})
export class SignUpParent {
  parent: Parent = new Parent();
  message!: string;
  showAlert!: boolean;
  isSubmitting!: boolean;

  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {}

  signUpParent(): void {
    console.log("Sign-up method called", this.parent);

    if (this.signInNgForm.invalid) {
      this.signInNgForm.control.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.showAlert = false;

    this.authService.signUpParent(this.parent).subscribe({
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
