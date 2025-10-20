import { Component, OnInit } from '@angular/core';
import { MaterialButtonModule } from '../../shared/material/material-button.module';
import { MaterialFormModule } from '../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../shared/material/material-layout.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    standalone: true,
    imports: [SharedModule, MaterialButtonModule, MaterialFormModule,MaterialLayoutModule]
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
