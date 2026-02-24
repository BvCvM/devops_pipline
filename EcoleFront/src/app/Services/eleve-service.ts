import { Injectable } from '@angular/core';
import { environment } from '../../environments/development.environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListEleve } from '../../Models/list-eleve';
import { Eleve } from '../../Models/eleve';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private baseUrl = environment.baseUrl + 'User';

  constructor(private http: HttpClient) {}


  getAllEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.baseUrl}/listerEleves`);
  }

deleteEleveById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`);
}

  
}
