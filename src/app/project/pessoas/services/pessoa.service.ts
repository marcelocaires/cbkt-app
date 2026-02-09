import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { CrudService } from '../../../shared/services/crud.service';

export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone?: string;
  tipo: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends CrudService<Pessoa>{

  constructor() {
    const apiUrl = `${env.apiCadastroUrl}/pessoa`;
    super(
      apiUrl,
      apiUrl,
      'Pessoa',
      'Pessoas'
    );
  }

  getPessoaByCpf(cpf: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.urlPath}/cpf/${cpf}`);
  }
}
