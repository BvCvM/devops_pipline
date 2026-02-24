import { Component, signal } from '@angular/core';
import { Matiere } from '../../../Models/matiere';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatiereService } from '../../Services/matiere-service';

@Component({
  selector: 'app-gestion-matiere',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './gestion-matiere.html',
  styleUrl: './gestion-matiere.css'
})
export class GestionMatiere {
  matiere : Matiere = new Matiere;
  formAddMatiere!:FormGroup; 
  matiereList = signal<Matiere[]>([]);
  FormGroupviewupd!:FormGroup;
  submitted! : boolean;
  viewmodelmatiere : Matiere = new Matiere;




  constructor(private serviceMatiere : MatiereService){

    this.formAddMatiere = new FormGroup({
      'coeff' : new FormControl('', Validators.required),
      'duree' : new FormControl('', Validators.required),
      'nom' : new FormControl('', Validators.required),
    });
    this.FormGroupviewupd = new FormGroup({
      'coeff' : new FormControl('', Validators.required),
      'duree' : new FormControl('', Validators.required),
      'nom' : new FormControl('', Validators.required),
    });
    this.getListMatiere()

  }

  ngOnInit(): void {
//     const storedMatiereList = localStorage.getItem('classeList');
// if (storedMatiereList) {
//   this.classeList = JSON.parse(storedMatiereList);
// }

// this.getListMatiere();

  
  }


    addMatiere()
  {
    
    if(this.formAddMatiere.invalid && this.submitted ==true )
    {
      console.log(this.formAddMatiere.value);
      return  ;
    }
    this.matiere.coeff = this.formAddMatiere.value.coeff;
    this.matiere.duree = this.formAddMatiere.value.duree;
    this.matiere.nom = this.formAddMatiere.value.nom;

    console.log(this.matiere)
    this.serviceMatiere.createMatiere(this.matiere)
        .subscribe({
          next: (res) => {
            alert("Matiere a été ajouté!")
          // this.router.navigate(['/vendeur/gerrerenchre']);
          //this.getListMatiere()
            console.log(res)
            this.submitted = true;
            console.log("hhhhhhhhhhhhhhhhhhh")
          },
        });
      }
    //isLoading: boolean = false;

    getListMatiere(): void {
      // this.isLoading.set(true); // si tu utilises un signal pour isLoading
    
      this.serviceMatiere.getAllMatiere().subscribe({
        next: (res) => {
          this.matiereList.set(res); // mise à jour du signal
          console.log('Liste des Matieres :', res);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des Matieres :', err);
        },
        complete: () => {
          // this.isLoading.set(false); // si loading est un signal aussi
        }
      });
    }





      getbyid(id: number): void {
        //this.isLoading = true;
      
        this.serviceMatiere.getMatiereById(id).subscribe({
          next: (res) => {
            this.viewmodelmatiere = res;
            // console.log('Matiere récupérée :', res); // Utilise en debug uniquement
          },
          error: (err) => {
            console.error('Erreur lors de la récupération de la classe :', err);
          },
          complete: () => {
          // this.isLoading = false;
          }
        });
      }

      

      getmatiere(id:number)
      {
  
        if(id!=undefined && id !=null)
        {
          this.serviceMatiere.getMatiereById(id ).subscribe(
            res=>{
              console.log(res);
              this.viewmodelmatiere=res
          },error=>{
            console.error(error)
          },()=>{
        
        
            this.FormGroupviewupd.get("nom")?.setValue(this.viewmodelmatiere.nom);
            this.FormGroupviewupd.get("duree")?.setValue(this.viewmodelmatiere.duree);
            this.FormGroupviewupd.get("coeff")?.setValue(this.viewmodelmatiere.coeff);
            this.FormGroupviewupd.updateValueAndValidity()
          });
        }
      }
    


      deleteMatiere(id:number)
      {
        if(id!=undefined && id !=null)
        {
          Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas récupérer entite classe!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-la!',
            cancelButtonText: 'Non, gardez-la'
          }).then((result : any) => {
            if (result.value) {
            // alert(id);
              this.serviceMatiere.deleteMatiereById(id)
              .subscribe(res=>{
                this.getListMatiere()
              })
            Swal.fire(
              'Supprimé!',
              'Votre classe entite a été supprimée.',
              'success'
            )
        
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Annulé',
              'Votre niveau est en sécurité 🙂',
              'error'
            )
            }
          })
        }
      }


      updateMatiere()
      {
        if(this.FormGroupviewupd.invalid && this.submitted ==true)
        {
          console.log(this.FormGroupviewupd.value);
          return  ;
        }
        this.viewmodelmatiere.nom = this.FormGroupviewupd.value.nom;
        this.viewmodelmatiere.coeff = this.FormGroupviewupd.value.coeff;
        this.viewmodelmatiere.duree = this.FormGroupviewupd.value.duree;
        console.log(this.viewmodelmatiere)
        this.serviceMatiere.updateMatiere(this.viewmodelmatiere)
            .subscribe({
              next: (res) => {
                alert("classe a été modifie!")
                this.getListMatiere()
                console.log(res)
                this.submitted = true;
                console.log("hhhhhhhhhhhhhhhhhhh")
              },
            });}














        
  }
