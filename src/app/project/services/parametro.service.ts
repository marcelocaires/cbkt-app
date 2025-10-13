import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly baseUrl = 'http://localhost:8080/api/parametros/graduacao';

  constructor(private http: HttpClient) {}

  getCores(): Observable<Cor[]> {
    return this.http.get<Cor[]>(`${this.baseUrl}/cores`);
  }

  getGraus(): Observable<Grau[]> {
    return this.http.get<Grau[]>(`${this.baseUrl}/graus`);
  }
}
