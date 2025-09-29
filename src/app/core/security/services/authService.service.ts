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

  constructor(){}

  autenticar(email: string, password: string): Observable<any> {
      return this.http.post('login',{email,password});
  }

  passwordReset(p:PasswordReset){
    return this.http.post(`password/reset`,p);
  }

  passwordResetEmail(email:String){
    return this.http.post(`password/reset/email`,{email});
  }

  passwordTokenCheck(t:string){
    return this.http.post(`token/check`,{token:t});
  }

  primeiroAcesso(form:any){
    return this.http.post(`enroll`,form);
  }
}
