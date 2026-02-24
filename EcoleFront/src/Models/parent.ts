import { Eleve } from "./eleve";
import { Registerrequest } from "./registerrequest";



export class Parent extends Registerrequest{
    description!: string;
    eleves!: Eleve[];

}
