import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { appinfo } from '../../../../../environments/appinfo';
import { SharedModule } from '../../../../shared/shared.module';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';

@Component({
    selector: 'app-atleta-layout',
    templateUrl: './atleta-layout.component.html',
    styleUrls: ['./atleta-layout.component.scss'],
    standalone: true,
    imports: [
      RouterOutlet,
      SharedModule,
      HeaderLayoutComponent
    ]
})
export class AtletaLayoutComponent implements OnInit {

  public loading = true;
  public sideNav:boolean=appinfo.isSideNav;
  isNavHide=false;

  constructor() {}

  ngOnInit() {}

}
