import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CoursService } from '../../Services/cours-service';
import { MatiereService } from '../../Services/matiere-service';
import { Matiere } from '../../../Models/matiere';
import { Cours } from '../../../Models/cours';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-cours',
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-cours.html',
  standalone: true,
  styleUrl: './gestion-cours.css'
})
export class GestionCours {

  titre = '';
  selectedMatiereId!: number;
  file!: File;
  fileName: string = '';
  matiereOptions = signal<Matiere[]>([]);
  coursList: Cours[] = [];
  loading = false;

  constructor(
    private coursService: CoursService,
    private matiereService: MatiereService
  ) { }

  ngOnInit(): void {
    this.loadMatieres();
    this.getAllCours();
  }

  loadMatieres() {
    this.matiereService.getAllMatiere().subscribe(res => {
      this.matiereOptions.set(res);
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  // ✅ ADD COURSE with SweetAlert + auto-refresh
  addCours() {
    if (!this.titre || !this.selectedMatiereId || !this.file) {
      Swal.fire('Attention', 'Veuillez remplir tous les champs.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.titre);
    formData.append('matiereId', this.selectedMatiereId.toString());
    formData.append('file', this.file);

    this.coursService.addCours(formData).subscribe({
      next: () => {
        Swal.fire('Succès ✅', 'Cours ajouté avec succès !', 'success');
        this.titre = '';
        this.selectedMatiereId = 0;
        this.file = undefined!;
        this.getAllCours(); // 🔁 auto-refresh list
      },
      error: (err) => {
        Swal.fire('Erreur ❌', 'Impossible d\'ajouter le cours.', 'error');
        console.error(err);
      }
    });
  }

  // ✅ GET ALL COURSES
  getAllCours(): void {
    this.loading = true;
    this.coursService.getAllCours().subscribe({
      next: (data) => {
        this.coursList = data;
        this.loading = false;
      },
      error: (err) => {
        Swal.fire('Erreur', 'Impossible de charger les cours.', 'error');
        this.loading = false;
        console.error(err);
      }
    });
  }

  // ✅ DELETE COURSE with confirmation + auto-refresh
  deleteCours(id: number) {
    Swal.fire({
      title: 'Supprimer ce cours ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursService.deleteCours(id).subscribe({
          next: () => {
            Swal.fire('Supprimé ✅', 'Le cours a été supprimé.', 'success');
            this.getAllCours(); // 🔁 auto-refresh list
          },
          error: (err) => {
            Swal.fire('Erreur ❌', 'Échec de la suppression.', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}
