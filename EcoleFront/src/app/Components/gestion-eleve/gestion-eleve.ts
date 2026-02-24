import { Component, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { EleveService } from '../../Services/eleve-service';
import { Eleve } from '../../../Models/eleve';
import { AuthService } from '../../Services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-eleve',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gestion-eleve.html',
  styleUrl: './gestion-eleve.css'
})
export class GestionEleve implements OnInit {
  eleveList = signal<Eleve[]>([]);
  FormGroupviewupd!: FormGroup;
  submitted: boolean = false;
  viewmodeleleve: Eleve = new Eleve();

  constructor(private eleveService: EleveService, private router: Router) {}

  ngOnInit(): void {
    this.getListEleves();
  }


  getListEleves(): void {
    this.eleveService.getAllEleves().subscribe({
      next: (res) => {
        this.eleveList.set(res);
        console.log('Liste des Élèves :', res);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des élèves :', err);
        Swal.fire('Erreur!', 'Erreur lors du chargement des élèves', 'error');
      }
    });
  }

  


  deleteEleve(id: number): void {
    if (id !== undefined && id !== null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cet élève!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          this.eleveService.deleteEleveById(id).subscribe({
            next: (res) => {
              this.getListEleves();
              Swal.fire(
                'Supprimé!',
                'L\'élève a été supprimé avec succès.',
                'success'
              );
            },
            error: (err) => {
              Swal.fire(
                'Erreur!',
                'Erreur lors de la suppression de l\'élève.',
                'error'
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'L\'élève est en sécurité 🙂',
            'info'
          );
        }
      });
    }
  }

  navigateToModifEleve(id: number): void {
    this.router.navigate(['/modifEleve']);
    this.eleveService.deleteEleveById(id).subscribe({
      next: (res) => {
        this.getListEleves();
      }
    });

    
    // Alternatively, you can use:
    // this.router.navigate(['/modif-eleve'], { queryParams: { id: eleveId } });
  }

}