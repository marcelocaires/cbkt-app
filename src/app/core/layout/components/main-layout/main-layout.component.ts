import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { appinfo } from '../../../../../environments/appinfo';

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
  isNavHide=false;

  constructor() {}

  ngOnInit() {}

}
