import { Routes } from '@angular/router';
import { AtletaLayoutComponent } from './core/layout/components/atleta-layout/atleta-layout.component';
import { MainLayoutComponent } from './core/layout/components/main-layout/main-layout.component';
import { ExemplosComponent } from './examples/exemplos.component';
import { AtletaComponent } from './project/atleta/pages/atleta/atleta.component';
import { LoginComponent } from './project/auth/pages/login/login.component';
import { PasswordResetComponent } from './project/auth/pages/password-reset/password-reset.component';
import { PrimeiroAcessoComponent } from './project/auth/pages/primeiro-acesso/primeiro-acesso.component';
import { GraduacaoCrudComponent } from './project/graduacao/pages/graduacao-crud/graduacao-crud.component';
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
    path: 'exemplos',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            component: ExemplosComponent
        }
    ],
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
    path: 'graduacao',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            component: GraduacaoCrudComponent
        }
    ],
  },
  {
    path: 'atleta/:id',
    component: AtletaLayoutComponent,
    children: [
        {
            path: '',
            component: AtletaComponent
        }
    ],
  }
];
