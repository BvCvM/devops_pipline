import { Routes } from '@angular/router';
import { SignIn } from './Components/sign-in/sign-in';
import { SignUpEleve } from './Components/sign-up-eleve/sign-up-eleve';
//import { SignUpParent } from './Components/sign-up-parent/sign-up-parent';
import { SignUpProfesseur } from './Components/sign-up-professeur/sign-up-professeur';
import { GestionClasse } from './Components/gestion-classe/gestion-classe';
import { GestionCours } from './Components/gestion-cours/gestion-cours';
import { GestionMatiere } from './Components/gestion-matiere/gestion-matiere';
import { GestionEleve } from './Components/gestion-eleve/gestion-eleve';
import { ModifEleve } from './Components/modif-eleve/modif-eleve';
import { GestionProfesseur } from './Components/gestion-professeur/gestion-professeur';
import { ModifProf } from './Components/modif-prof/modif-prof';
import { SignUpParent } from './Components/sign-up-parent/sign-up-parent';
import { Dashboard } from './Components/dashboard/dashboard';
import { ContactComponent } from './contact/contact';

export const routes: Routes = [
{path:'',component:SignIn},
{path:'signUpEleve',component:SignUpEleve},
{path:'signUpProfesseur',component:SignUpProfesseur},
{path:'gestionClasse',component:GestionClasse},
{path:'gestionCours',component:GestionCours},
{path:'gestionMatiere',component:GestionMatiere},
{path:'gestionEleve',component:GestionEleve},
{path:'modifEleve',component:ModifEleve},
{path:'gestionProf',component:GestionProfesseur },
{path:'modifProf',component:ModifProf},
{path:'signUpParent',component:SignUpParent},
{path: 'dashboard', component:Dashboard },
{ path: 'contact', component: ContactComponent },







];
