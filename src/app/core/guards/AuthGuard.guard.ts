import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private router=inject(Router);

  constructor() { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ):Observable<boolean> | boolean {
    return true;
  }
}
