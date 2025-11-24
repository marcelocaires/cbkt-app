import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { MySnackBarService } from '../components/my-snackbar-component/my-snackbar.service';
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
  private viaCepUrl = 'https://viacep.com.br/ws';
  private apiUrl = `${env.apiCadastroUrl}/endereco`;
  http=inject(HttpClient);
  msgService=inject(MySnackBarService);

  constructor() {}

  buscarEnderecoPorCep(cep: string): Observable<EnderecoResponse> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<EnderecoResponse>(`${this.apiUrl}/${cepLimpo}`);
  }

  buscarEnderecoViaCep(cep: string): Observable<EnderecoResponse> {
    if(!this.validarCep(cep)) {
      this.msgService.msgErro('CEP inválido');
      return new Observable<EnderecoResponse>();
    }
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<EnderecoResponse>(`${this.viaCepUrl}/${cepLimpo}/json/`);
  }

  validarCep(cep: string): boolean {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(cep);
  }
}
