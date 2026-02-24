import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EleveService } from '../../Services/eleve-service';
import { ProfService } from '../../Services/prof-service';
import { ClasseService } from '../../Services/classe-service';
import { MatiereService } from '../../Services/matiere-service';
import { CoursService } from '../../Services/cours-service'; // ✅ NEW
import { Eleve } from '../../../Models/eleve';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule],
})
export class Dashboard implements OnInit {
  totalEleves = 0;
  totalProfs = 0;
  totalClasses = 0;
  totalMatieres = 0;
  totalCours = 0; // ✅ NEW

  constructor(
    private router: Router,
    private eleveService: EleveService,
    private profService: ProfService,
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private coursService: CoursService, // ✅ NEW
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }
  showEleveDropdown = false;
showProfDropdown = false;

toggleDropdown(type: string) {
  if (type === 'eleve') {
    this.showEleveDropdown = !this.showEleveDropdown;
  } else if (type === 'prof') {
    this.showProfDropdown = !this.showProfDropdown;
  }
}

  loadCounts(): void {
    // 👨‍🎓 Élèves
    this.eleveService.getAllEleves().subscribe({
      next: (eleves) => {
        this.totalEleves = eleves.length;
        this.cd.detectChanges();
      },
    });

    // 👨‍🏫 Professeurs
    this.profService.getAllProfes().subscribe({
      next: (profs) => {
        this.totalProfs = profs.length;
        this.cd.detectChanges();
      },
    });

    // 🏫 Classes
    this.classeService.getAllClasse().subscribe({
      next: (classes) => {
        this.totalClasses = classes.length;
        this.cd.detectChanges();
      },
    });

    // 📚 Matières
    this.matiereService.getAllMatiere().subscribe({
      next: (matieres) => {
        this.totalMatieres = matieres.length;
        this.cd.detectChanges();
      },
    });

    // 🧾 Cours
    this.coursService.getAllCours().subscribe({
      next: (cours) => {
        this.totalCours = cours.length;
        this.cd.detectChanges();
      },
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  sidebarLinks = [
    { name: 'Gestion Élève', path: 'gestionEleve', icon: '👨‍🎓' },
    { name: 'Gestion Prof', path: 'gestionProf', icon: '👨‍🏫' },
    { name: 'Gestion Classe', path: 'gestionClasse', icon: '🏫' },
    { name: 'Gestion Matière', path: 'gestionMatiere', icon: '📚' },
    { name: 'Gestion Cours', path: 'gestionCours', icon: '📝' },
    // 🆕 New Contact card (replaces SignUp Parent)
    { name: 'Contact', path: 'contact', icon: '📞' },
  ];
  
}
