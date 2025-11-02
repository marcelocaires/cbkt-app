import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPageableResponse } from '../../../shared/components/crud-mat-table/interfaces';
import { Atleta } from '../../atleta/models/atleta.model';

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?:string|null;
}

@Injectable({ providedIn: 'root' })
export class AtletasService {
  private apiUrl = 'http://localhost:8080/api/atleta';

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
