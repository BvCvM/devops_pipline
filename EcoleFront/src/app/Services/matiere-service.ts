import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../../Models/matiere';
import { environment } from '../../environments/development.environment';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
 
  baseUrl = environment.apiUrl+ "matiere"
  constructor(private _httpClient :HttpClient) { }

  getAllMatiere(): Observable<Matiere[]> {
    return this._httpClient.get<Matiere[]>(`${this.baseUrl}/lister`);
  }

  getMatiereById(id :number): Observable<Matiere>{
    return this._httpClient.get<Matiere>(`${this.baseUrl}/getById/${id}`);
  }
  createMatiere(m : Matiere): Observable<Matiere>{
    return this._httpClient.post<Matiere>(`${this.baseUrl}/save`,m);
  }
  deleteMatiereById(id:number): Observable<void>{
    return this._httpClient.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateMatiere(matiere : Matiere): Observable<Matiere>{
    return this._httpClient.post<Matiere>(`${this.baseUrl}/update`,matiere);
  }

  getMatiereByName(nom:String): Observable<Matiere[]> {
    return this._httpClient.get<Matiere[]>(`${this.baseUrl}/getByName/${nom}`);
  }

}
