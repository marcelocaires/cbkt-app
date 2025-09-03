import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../../storage/services/storage.service';
import { Usuario } from './usuarioService.service';
const KEY = 'token';

export interface TokenJwt{
  authorities: string[]
  exp: number
  iat: string
  iss: string
  sub: string
  usuario:Usuario
}

@Injectable({
    providedIn: 'root'
})

export class TokenService {
  storageService=inject(StorageService);
  hasToken() {
      if(this.getToken()!=null){
          return true;
      }
      return false;
  }

  setToken(token:string) {
    this.storageService.sessionStorage.setItem(KEY, token);
  }

  getToken():any {
      return this.storageService.sessionStorage.getItem(KEY);
  }

  removeToken() {
    this.storageService.sessionStorage.removeItem(KEY);
  }

  getTokenJwt():TokenJwt{
    if (this.hasToken()) {
        const token = this.getToken();
        return jwtDecode(token);;
    }
    return jwtDecode("");;
  }

  getExpirationTime():any{
    if(this.hasToken()){
      const exp=this.getTokenJwt().exp;
      const expiresDate:any=new Date(exp*1000);
      const expiresTime =expiresDate.getTime();
      return expiresTime;
    }
  }

}
