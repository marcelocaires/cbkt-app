import { Routes } from '@angular/router';
import { LoginComponent } from './project/auth/pages/login/login.component';
import { PasswordResetComponent } from './project/auth/pages/password-reset/password-reset.component';
import { PrimeiroAcessoComponent } from './project/auth/pages/primeiro-acesso/primeiro-acesso.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'primeiro-acesso',
    component: PrimeiroAcessoComponent
  },
  {
    path: 'password-reset/:email/:token',
    component: PasswordResetComponent
  }
];
