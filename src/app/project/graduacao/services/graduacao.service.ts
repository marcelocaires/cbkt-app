import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { CrudService } from '../../../shared/services/crud.service';
import { Graduacao } from '../model/graduacao';
@Injectable({
  providedIn: 'root'
})
export class GraduacaoService extends CrudService<Graduacao>{

  constructor(){
    const apiUrl = `${env.apiCadastroUrl}/graduacao`;
    super(
      apiUrl,
      apiUrl,
      'Graduação',
      'Graduações'
    );
  }

  getById(id: number): Observable<Graduacao> {
    return this.http.get<Graduacao>(`${this.urlPath}/${id}`);
  }
}
