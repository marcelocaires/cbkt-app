import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { Atleta } from '../models/atleta.model';

@Injectable({ providedIn: 'root' })
export class AtletaService {
  private readonly apiUrl = `${env.apiCadastroUrl}/atleta/id`;

  constructor(private http: HttpClient) {}

  getAtletaById(id: number): Observable<Atleta> {
    return this.http.get<Atleta>(`${this.apiUrl}/${id}`);
  }
}
