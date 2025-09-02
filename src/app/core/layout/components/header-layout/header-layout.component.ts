import { Component, effect, inject, OnInit, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalAtendimentoDlgComponent } from '../../../../project/components/local-atendimento-dlg/local-atendimento-dlg.component';
import { LocalAtendimento, ParametrosService } from '../../../../project/services/parametros.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UsuarioService } from '../../../security/auth/services/usuarioService.service';
import { ThemeToggleComponent } from '../../theme/theme-toggle.component';
@Component({
    selector: 'app-header-layout',
    templateUrl: './header-layout.component.html',
    styleUrls: ['./header-layout.component.scss'],
    standalone: true,
    imports: [SharedModule, ThemeToggleComponent, RouterLink]
})
export class HeaderLayoutComponent extends BaseComponent implements OnInit{

  parametrosService=inject(ParametrosService);
  usuarioService=inject(UsuarioService);
  localAtendimento$: WritableSignal<LocalAtendimento|null>;
  local:LocalAtendimento|null=null;
  isAdm:boolean=false

  constructor(){
    super();
    this.localAtendimento$=this.parametrosService.getLocalAtendimento();
    effect(() => {
      this.local=this.localAtendimento$();
    });
  }

  ngOnInit(): void {
    this.isAdm=this.usuarioService.isAdm();
  }

  logof(){
    this.usuarioService.logout();
    this.router.navigate(['/']);
  }

  openSelectLocal(){
    const dialog=this.matDialog.open(LocalAtendimentoDlgComponent,{
      minWidth: '1000px',
      disableClose: true
    });
    dialog.afterClosed().subscribe((local)=>{});
  }
}
