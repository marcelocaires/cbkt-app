import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/components/components/main-layout/main-layout.component';
import { AtletaComponent } from './project/atleta/pages/atleta/atleta.component';
import { LoginComponent } from './project/auth/pages/login/login.component';
import { PasswordResetComponent } from './project/auth/pages/password-reset/password-reset.component';
import { PrimeiroAcessoComponent } from './project/auth/pages/primeiro-acesso/primeiro-acesso.component';
import { GraduacaoComponent } from './project/graduacao/pages/graduacao/graduacao.component';

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
    path: 'password/:type/:token',
    component: PasswordResetComponent
  },
  {
    path: 'graduacoes',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            component: GraduacaoComponent
        }
    ],
    //canActivate: [AuthGuard],
  },
  {
    path: 'atleta/:id',
    component: AtletaComponent
  }
];
