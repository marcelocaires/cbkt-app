import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { CrudService } from '../../../shared/services/crud.service';
import { Clube } from '../../atleta/models/atleta.model';

@Injectable({
  providedIn: 'root',
})
export class ClubeService extends CrudService<Clube>{

  constructor(){
    const apiUrl = `${env.apiCadastroUrl}/clube`;
    super(
      apiUrl,
      apiUrl,
      'Clube',
      'Clubes'
    );
  }
}
