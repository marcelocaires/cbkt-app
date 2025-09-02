import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { appinfo } from '../../../../../../environments/appinfo';
import { SharedModule } from '../../../../shared/shared.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: true,
    imports: [RouterOutlet, SharedModule, FooterComponent, HeaderLayoutComponent, SidenavComponent]
})
export class MainLayoutComponent implements OnInit {

  public loading = true;
  public sideNav:boolean=appinfo.isSideNav;

  constructor() {}

  ngOnInit() {}

}
