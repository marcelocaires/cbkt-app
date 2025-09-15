import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordReset } from '../../../project/auth/pages/password-reset/password-reset.component';
import { UsuarioService } from './usuarioService.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private http=inject(HttpClient);
  private usuarioService=inject(UsuarioService);
  private readonly PATH: string = 'login';
  private readonly PASSWORD_PATH: string = 'password';

  constructor(){}

  autenticar(titulo: string, senha: string): Observable<any> {
      return this.http.post(this.PATH,{titulo,senha});
  }

  passwordForgot(titulo:string){
    return this.http.get(`${this.PASSWORD_PATH}/forgot/${titulo}`);
  }

  passwordReset(p:PasswordReset){
    return this.http.post(`${this.PASSWORD_PATH}/reset/${p.token}`,p);
  }

  passwordTokenCheck(token:string){
    return this.http.get(`${this.PASSWORD_PATH}/check/${token}`);
  }

  primeiroAcesso(form:any){
    return this.http.post(`first`,form);
  }
}
