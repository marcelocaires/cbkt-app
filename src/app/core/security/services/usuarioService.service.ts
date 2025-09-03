import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../../storage/services/storage.service';
import { TokenService } from './tokenService.service';

export class Usuario {
  constructor(
    public titulo: string,
    public matricula: string,
    public cpf: string,
    public nome: string,
    public lotacaoSigla: string,
    public lotacaoNome: string,
    public lotacaoMunicipio: string
  ){}
}

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
  storageService=inject(StorageService);

  constructor(private tokenService: TokenService) {
      this.decodeJWT();
  }

  private decodeJWT() {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      const tokenDecoded: any = jwtDecode(token);
      const usuario: Usuario = tokenDecoded.usuario;
      this.storageService.sessionStorage.setItem('usuario',usuario);
    }
  }

  setToken(token: any) {
      this.tokenService.setToken(token);
      this.decodeJWT();
  }

  setUsuario(usuario:Usuario) {
    this.storageService.sessionStorage.setItem('usuario',JSON.stringify(usuario));
  }

  logout() {
      this.tokenService.removeToken();
      this.storageService.sessionStorage.removeItem('usuario');
  }

  isLogin() {
      return this.tokenService.hasToken();
  }

}
