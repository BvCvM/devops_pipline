  import { Component,signal  } from '@angular/core';
  import { ClasseService } from '../../Services/classe-service';
  import { Classe } from '../../../Models/classe';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-gestion-classe',
    imports: [ReactiveFormsModule,CommonModule],
    templateUrl: './gestion-classe.html',
    styleUrls: ['./gestion-classe.css'] 
  })
  export class GestionClasse {
    classee : Classe = new Classe;
    formAddClasee!:FormGroup; 
    classeList = signal<Classe[]>([]);
    FormGroupviewupd!:FormGroup;
    submitted! : boolean;
    viewmodelclass : Classe = new Classe;




    constructor(private serviceClasse : ClasseService){

      this.formAddClasee = new FormGroup({
        'titre' : new FormControl('', Validators.required),
        'anneescolaire' : new FormControl('', Validators.required),
      });
      this.FormGroupviewupd = new FormGroup({
        'titre' : new FormControl('', Validators.required),
        'anneescolaire' : new FormControl('', Validators.required),
      });
      this.getListClasse()

    }

    ngOnInit(): void {
  //     const storedClasseList = localStorage.getItem('classeList');
  // if (storedClasseList) {
  //   this.classeList = JSON.parse(storedClasseList);
  // }

  // this.getListClasse();

    
    }


      addClasse()
    {
      
      if(this.formAddClasee.invalid && this.submitted ==true )
      {
        console.log(this.formAddClasee.value);
        return  ;
      }
      this.classee.titre = this.formAddClasee.value.titre;
      this.classee.anneescolaire = this.formAddClasee.value.anneescolaire;
      console.log(this.classee)
      this.serviceClasse.createClass(this.classee)
          .subscribe({
            next: (res) => {
              alert("Classe a été ajouté!")
            // this.router.navigate(['/vendeur/gerrerenchre']);
            //this.getListClasse()
              console.log(res)
              this.submitted = true;
              console.log("hhhhhhhhhhhhhhhhhhh")
            },
          });
        }
      //isLoading: boolean = false;

      getListClasse(): void {
        // this.isLoading.set(true); // si tu utilises un signal pour isLoading
      
        this.serviceClasse.getAllClasse().subscribe({
          next: (res) => {
            this.classeList.set(res); // mise à jour du signal
            console.log('Liste des classes :', res);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des classes :', err);
          },
          complete: () => {
            // this.isLoading.set(false); // si loading est un signal aussi
          }
        });
      }





        getbyid(id: number): void {
          //this.isLoading = true;
        
          this.serviceClasse.getClassById(id).subscribe({
            next: (res) => {
              this.viewmodelclass = res;
              // console.log('Classe récupérée :', res); // Utilise en debug uniquement
            },
            error: (err) => {
              console.error('Erreur lors de la récupération de la classe :', err);
            },
            complete: () => {
            // this.isLoading = false;
            }
          });
        }

        

        getclass(id:number)
        {
    
          if(id!=undefined && id !=null)
          {
            this.serviceClasse.getClassById(id ).subscribe(
              res=>{
                console.log(res);
                this.viewmodelclass=res
            },error=>{
              console.error(error)
            },()=>{
          
          
              this.FormGroupviewupd.get("titre")?.setValue(this.viewmodelclass.titre);
              this.FormGroupviewupd.get("anneescolaire")?.setValue(this.viewmodelclass.anneescolaire);
              this.FormGroupviewupd.updateValueAndValidity()
            });
          }
        }
      


        deleteClasee(id:number)
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
                this.serviceClasse.deleteClassById(id)
                .subscribe(res=>{
                  this.getListClasse()
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


        updateClasse()
        {
          if(this.FormGroupviewupd.invalid && this.submitted ==true)
          {
            console.log(this.FormGroupviewupd.value);
            return  ;
          }
          this.viewmodelclass.titre = this.FormGroupviewupd.value.titre;
          this.viewmodelclass.anneescolaire = this.FormGroupviewupd.value.anneescolaire;
          console.log(this.viewmodelclass)
          this.serviceClasse.updateClass(this.viewmodelclass)
              .subscribe({
                next: (res) => {
                  alert("classe a été modifie!")
                  this.getListClasse()
                  console.log(res)
                  this.submitted = true;
                  console.log("hhhhhhhhhhhhhhhhhhh")
                },
              });}














          
    }


