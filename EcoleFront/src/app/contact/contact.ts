import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  sendMessage() {
    if (!this.name || !this.email || !this.message) {
      Swal.fire('Attention', 'Veuillez remplir tous les champs.', 'warning');
      return;
    }

    // 👇 For now, just simulate a successful send
    Swal.fire('✅ Message envoyé', 'Nous vous répondrons bientôt.', 'success');

    // Clear form
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
