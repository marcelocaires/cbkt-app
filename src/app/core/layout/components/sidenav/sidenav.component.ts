import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component, inject } from '@angular/core';
import { appinfo } from '../../../../../../environments/appinfo';
import { SharedModule } from '../../../../shared/shared.module';
import { Usuario, UsuarioService } from '../../../security/auth/services/usuarioService.service';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, SharedModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  usuarioService=inject(UsuarioService);
  usuario:Usuario|null=null;
  sistemaSigla=appinfo.sistemaSigla;
  sistemaNome=appinfo.sistemaNome;
  isRecepcionista=false;
  isAdm=false;
  isDev=false;

  constructor(){
    this.usuario=this.usuarioService.getUsuario();
    if(this.usuario){
      console.log(this.usuario);
      this.isRecepcionista=this.usuario.perfil=="RECEPCIONISTA";
      this.isAdm=this.usuario.perfil=="ADM";
      this.isDev=this.usuario.titulo=="080144070515";
    }
  }
}
