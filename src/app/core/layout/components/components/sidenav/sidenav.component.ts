import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component, inject } from '@angular/core';
import { appinfo } from '../../../../../../environments/appinfo';
import { MaterialButtonModule } from '../../../../../shared/material/material-button.module';
import { MaterialNavigationModule } from '../../../../../shared/material/material-navigation.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { Usuario, UsuarioService } from '../../../../security/services/usuarioService.service';


@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, SharedModule,MaterialNavigationModule,MaterialButtonModule],
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
    }
  }
}
