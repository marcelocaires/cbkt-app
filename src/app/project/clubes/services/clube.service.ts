import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { ApiPageableResponse } from '../../../shared/components/crud-mat-table/interfaces';
import { CrudService } from '../../../shared/services/crud.service';
import { Clube } from '../../atleta/models/atleta.model';
import { ClubeCompleto } from '../models/clube-completo.model';

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ClubeService extends CrudService<Clube>{

  constructor(private httpClient: HttpClient){
    const apiUrl = `${env.apiCadastroUrl}/clube`;
    super(
      apiUrl,
      apiUrl,
      'Clube',
      'Clubes'
    );
  }

  getById(id: number): Observable<Clube> {
    return this.httpClient.get<Clube>(`${env.apiCadastroUrl}/clube/${id}`);
  }

  getClubeCompleto(id: number): Observable<ClubeCompleto> {
    return this.httpClient.get<ClubeCompleto>(`${env.apiCadastroUrl}/clube/full/${id}`);
  }

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

    return this.httpClient.get<ApiPageableResponse>(`${env.apiCadastroUrl}/clube/page`, { params: httpParams });
  }
}
