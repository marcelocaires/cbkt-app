import { RouterOutlet } from '@angular/router';

import { Component, inject, input } from '@angular/core';
import { appinfo } from '../../../../../environments/appinfo';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialNavigationModule } from '../../../../shared/material/material-navigation.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Usuario, UsuarioService } from '../../../security/services/usuarioService.service';
import { MenuComponent, MenuItem } from '../menu/menu.component';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [RouterOutlet, SharedModule, MaterialNavigationModule, MaterialButtonModule, MenuComponent],
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

  isOpen=input<boolean>(true);
  menuItems: MenuItem[]= [];

  constructor(){
    this.usuario=this.usuarioService.getUsuario();
    if(this.usuario){
      console.log(this.usuario);
    }
  }

}
