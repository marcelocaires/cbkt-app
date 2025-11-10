import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
export interface Cor {
  hex: string;
  indice: number;
  nome: string;
  codigo: string;
}

export interface Grau {
  codigo: string;
  grau: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private readonly baseUrl = `${env.apiCadastroUrl}/parametros/graduacao`;

  constructor(private http: HttpClient) {}

  getCores(): Observable<Cor[]> {
    return this.http.get<Cor[]>(`${this.baseUrl}/cores`);
  }

  getGraus(): Observable<Grau[]> {
    return this.http.get<Grau[]>(`${this.baseUrl}/graus`);
  }
}
