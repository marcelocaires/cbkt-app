import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EnderecoResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/api/endereco';

  constructor(private http: HttpClient) {}

  buscarEnderecoPorCep(cep: string): Observable<EnderecoResponse> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<EnderecoResponse>(`${this.apiUrl}/${cepLimpo}`);
  }
}
