import { Injectable } from '@angular/core';
import { environment } from '../../environments/development.environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professeur } from '../../Models/professeur';


@Injectable({
  providedIn: 'root'
})
export class ProfService {

  private baseUrl = environment.apiUrl + 'User';

  constructor(private http: HttpClient) {}


  getAllProfes(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(`${this.baseUrl}/listerProfes`);
  }

deleteProfById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimerprof/${id}`);
}
}
