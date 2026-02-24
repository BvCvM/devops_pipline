import { Injectable } from '@angular/core';
import { environment } from '../../environments/development.environment';
import { Classe } from '../../Models/classe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabelValu } from '../../Models/label-valu';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

baseUrl = environment.baseUrl+ "classes"
  constructor(private _httpClient :HttpClient) { }

  getAllClasse(): Observable<Classe[]> {
    return this._httpClient.get<Classe[]>(`${this.baseUrl}/lister`);
  }

  getClassById(id :number): Observable<Classe>{
    return this._httpClient.get<Classe>(`${this.baseUrl}/getById/${id}`);
  }
  createClass(classe : Classe): Observable<Classe>{
    return this._httpClient.post<Classe>(`${this.baseUrl}/save`,classe);
  }
  deleteClassById(id:number): Observable<void>{
    return this._httpClient.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateClass(classe : Classe): Observable<Classe>{
    return this._httpClient.post<Classe>(`${this.baseUrl}/update`,classe);
  }

  findallclasses(): Observable<LabelValu[]> {
    return this._httpClient.get<LabelValu[]>(`${this.baseUrl}/listerallclasses`);
  }





}
