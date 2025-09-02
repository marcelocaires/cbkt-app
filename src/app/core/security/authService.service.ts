import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { UsuarioService } from './usuarioService.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private http=inject(HttpClient);
  private usuarioService=inject(UsuarioService);
  private readonly PATH: string = 'login';

  constructor(){}

  autenticar(titulo: string, senha: string): Observable<any> {
      return this.http.post(
          this.PATH,
          {titulo,senha},
          {observe:'response'}
      ).pipe(
          tap(
            response => {
              !env.production ? console.log(response) : "";
              const authToken = response.headers.get('x-access-token');
              this.usuarioService.setToken(authToken);
            }
          )
      );
  }
}
