import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../models/atleta.model';

@Injectable({ providedIn: 'root' })
export class AtletaService {
  private apiUrl = 'http://localhost:8080/api/atleta/id';

  constructor(private http: HttpClient) {}

  getAtletaById(id: number): Observable<Atleta> {
    return this.http.get<Atleta>(`${this.apiUrl}/${id}`);
  }
}
