import { Component, inject } from '@angular/core';
import { appinfo } from '../../../../../environments/appinfo';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Usuario, UsuarioService } from '../../../security/services/usuarioService.service';
;

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [SharedModule,MaterialButtonModule]
})
export class FooterComponent {
  usuarioService=inject(UsuarioService)
  appVersion=appinfo.sistemaVersao;
  appName=appinfo.sistemaSigla+" - "+appinfo.sistemaNome;
  usuario:Usuario|null=null;

  constructor() {
    this.usuario=this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  ngOnInit() {

  }
}
