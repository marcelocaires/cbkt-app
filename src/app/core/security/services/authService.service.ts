import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { PasswordReset } from '../../../project/auth/pages/password-reset/password-reset.component';
import { UsuarioService } from './usuarioService.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
  apiUrl = `${env.apiAuthUrl}`;
  private http=inject(HttpClient);
  private usuarioService=inject(UsuarioService);

  constructor(){}

  autenticar(email: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`,{email,password});
  }

  passwordReset(p:PasswordReset){
    return this.http.post(`${this.apiUrl}/password/reset`,p);
  }

  passwordResetEmail(email:String){
    return this.http.post(`${this.apiUrl}/password/reset/email`,{email});
  }

  passwordTokenCheck(t:string){
    return this.http.post(`${this.apiUrl}/token/check`,{token:t});
  }

  primeiroAcesso(form:any){
    return this.http.post(`${this.apiUrl}/enroll`,form);
  }
}
