import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { ApiPageableResponse } from '../../../shared/components/crud-mat-table/interfaces';
import { Atleta, AtletaClube, AtletaGraduacao } from '../../atleta/models/atleta.model';

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?:string|null;
}

export interface updateAtletaPCDRequest {
  id: number;
  isPcd: boolean;
  deficienciaTipo: string;
  deficienciaDescricao: string;
  deficienciaCID: string;
  urlLaudoMedico: string;
}

@Injectable({ providedIn: 'root' })
export class AtletasService {
  private readonly apiUrl = `${env.apiCadastroUrl}/atleta`;

  constructor(private http: HttpClient) {}

  getAllPage(params?: PageParams): Observable<ApiPageableResponse> {
    let httpParams = new HttpParams();

    if (params?.page !== undefined) {
      httpParams = httpParams.set('page', params.page.toString());
    }

    if (params?.size !== undefined) {
      httpParams = httpParams.set('size', params.size.toString());
    }

    if (params?.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }

    if (params?.filter) {
      httpParams = httpParams.set('filter', params.filter);
    }

    return this.http.get<ApiPageableResponse>(`${this.apiUrl}/page`, { params: httpParams });
  }

  adicionarAtletaClube(form: any): Observable<AtletaClube[]> {
    const url = `${this.apiUrl}/clube`;
    return this.http.post<AtletaClube[]>(url, form);
  }

  adicionarGraduacaoAtleta(form: any): Observable<AtletaGraduacao[]> {
    const url = `${this.apiUrl}/graduacao`;
    return this.http.post<AtletaGraduacao[]>(url, form);
  }

  removerGraduacaoAtleta(idAtletaGraduacao: number): Observable<AtletaGraduacao[]> {
    const url = `${this.apiUrl}/graduacao/${idAtletaGraduacao}`;
    return this.http.delete<AtletaGraduacao[]>(url);
  }

  removerAtletaClube(idAtleta: number, idClube: number): Observable<AtletaClube[]> {
    const url = `${this.apiUrl}/${idAtleta}/clube/${idClube}`;
    return this.http.delete<AtletaClube[]>(url);
  }

  transferirAtletaClube(form: any): Observable<AtletaClube[]> {
    const url = `${this.apiUrl}/clube/transferir`;
    return this.http.post<AtletaClube[]>(url, form);
  }

  atualizarAtletaPCD(form: updateAtletaPCDRequest): Observable<Atleta> {
    const url = `${this.apiUrl}/pcd`;
    return this.http.put<Atleta>(url, form);
  }

  // Métodos CRUD adicionais
  findById(id: number): Observable<Atleta> {
    return this.http.get<Atleta>(`${this.apiUrl}/id/${id}`);
  }

  create(atleta: Partial<Atleta>): Observable<Atleta> {
    return this.http.post<Atleta>(this.apiUrl, atleta);
  }

  update(id: number, atleta: Partial<Atleta>): Observable<Atleta> {
    return this.http.put<Atleta>(`${this.apiUrl}/${id}`, atleta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para buscar todos os atletas (sem paginação)
  getAll(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.apiUrl);
  }
}
