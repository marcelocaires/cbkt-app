import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { appinfo } from '../../../../../../environments/appinfo';
import { SharedModule } from '../../../../../shared/shared.module';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: true,
    imports: [
      RouterOutlet,
      SharedModule,
      SidenavComponent,
      HeaderLayoutComponent
    ]
})
export class MainLayoutComponent implements OnInit {

  public loading = true;
  public sideNav:boolean=appinfo.isSideNav;

  constructor() {}

  ngOnInit() {}

}
