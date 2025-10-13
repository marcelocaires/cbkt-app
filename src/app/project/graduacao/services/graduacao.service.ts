import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Graduacao } from '../model/graduacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraduacaoService extends CrudService<Graduacao>{

  constructor(){
    super(
      'http://localhost:8080/api/graduacao',
      'http://localhost:8080/api/graduacao',
      'Graduação',
      'Graduações'
    );
  }

  getById(id: number): Observable<Graduacao> {
    return this.http.get<Graduacao>(`${this.urlPath}/${id}`);
  }
}
