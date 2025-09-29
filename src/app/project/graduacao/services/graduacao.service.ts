import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Graduacao } from '../model/graduacao';

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

}
