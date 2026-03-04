import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/development.environment';
import { Cours } from '../../Models/cours';


@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private baseUrl = environment.apiUrl +'cours';

  constructor(private http: HttpClient) { }

  addCours(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, formData);
  }



  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/all`);
  }

  deleteCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

 
}

  

 







