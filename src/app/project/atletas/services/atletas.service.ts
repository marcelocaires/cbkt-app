import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPageableResponse } from '../../../shared/components/crud-mat-table/interfaces';

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
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

    return this.http.get<ApiPageableResponse>(`${this.apiUrl}/page`, { params: httpParams });
  }
}
