import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialNavigationModule } from '../../../../shared/material/material-navigation.module';
import { SharedModule } from '../../../../shared/shared.module';
import { UsuarioService } from '../../../security/services/usuarioService.service';
import { ThemeToggleComponent } from '../../theme/theme-toggle.component';

@Component({
    selector: 'app-header-layout',
    templateUrl: './header-layout.component.html',
    styleUrls: ['./header-layout.component.scss'],
    standalone: true,
    imports: [SharedModule, RouterLink,MaterialLayoutModule,MaterialButtonModule,MaterialNavigationModule,ThemeToggleComponent]
})
export class HeaderLayoutComponent extends BaseComponent{
  usuarioService=inject(UsuarioService);
  hideNav=output<boolean>();
  isNavHide=false;

  constructor(){
    super()
  }

  logof() {
    throw new Error('Method not implemented.');
  }

  hideNavBar(){
    this.isNavHide=!this.isNavHide;
    this.hideNav.emit(this.isNavHide);
  }
}
