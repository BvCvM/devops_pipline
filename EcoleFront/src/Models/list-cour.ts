import { Professeur } from "./professeur";

export class ListCour {

    idCours!: number;
    titre!: string;
    urlcours!: string;
    filecours!: string;
    professeur!: Professeur;
    classesId!: number[];
    tache: any;
    
}
