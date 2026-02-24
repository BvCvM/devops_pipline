import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Professeur } from '../../../Models/professeur';
import { ProfService } from '../../Services/prof-service';


@Component({
  selector: 'app-gestion-professeur',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gestion-professeur.html',
  styleUrl: './gestion-professeur.css'
})
export class GestionProfesseur implements OnInit {
  ProfList = signal<Professeur[]>([]);
  FormGroupviewupd!: FormGroup;
  submitted: boolean = false;
  viewmodelProf: Professeur = new Professeur();

  constructor(private profService: ProfService, private router: Router) {}

  ngOnInit(): void {
    this.getListProfes();
  }


  getListProfes(): void {
    this.profService.getAllProfes().subscribe({
      next: (res) => {
        this.ProfList.set(res);
        console.log('Liste des Profes :', res);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des Profes :', err);
        Swal.fire('Erreur!', 'Erreur lors du chargement des Profes', 'error');
      }
    });
  }

  


  deleteProf(id: number): void {
    if (id !== undefined && id !== null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer ce Profes!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          this.profService.deleteProfById(id).subscribe({
            next: (res) => {
              this.getListProfes();
              Swal.fire(
                'Supprimé!',
                'Le professeur a été supprimé avec succès.',
                'success'
              );
            },
            error: (err) => {
              Swal.fire(
                'Erreur!',
                'Erreur lors de la suppression du Professeur.',
                'error'
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Le professeur est en sécurité 🙂',
            'info'
          );
        }
      });
    }
  }

  navigateToModifProf(id: number): void {
    this.router.navigate(['/modifEleve']);
    this.profService.deleteProfById(id).subscribe({
      next: (res) => {
        this.getListProfes();
      }
    });

    

  }

}