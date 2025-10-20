import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MaterialButtonModule } from '../shared/material/material-button.module';
import { MaterialFormModule } from '../shared/material/material-form.module';
import { MaterialLayoutModule } from '../shared/material/material-layout.module';
import { MaterialNavigationModule } from '../shared/material/material-navigation.module';
import { MaterialProgressModule } from '../shared/material/material-progress.module';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { IconExampleComponent } from './icons-example/icon-example.component';
import { MyTableComponent } from './my-table/my-table.component';

@Component({
    selector: 'app-exemplos',
    templateUrl: './exemplos.component.html',
    styleUrls: ['./exemplos.component.scss'],
    standalone: true,
    imports: [
      SharedModule,
      MyTableComponent,
      MaterialLayoutModule,
      MaterialButtonModule,
      MaterialNavigationModule,
      MaterialFormModule,
      MaterialProgressModule,
      IconExampleComponent
    ]
})
export class ExemplosComponent{
  dialog=inject(MatDialog);
  _formBuilder=inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  openFormDialog() {
    this.dialog.open(FormDialogComponent);
  }
  selects = new FormControl();
  selectList: string[] = ['1', '2', '3', '4', '5', '6'];
  selectObject(object: any): void {
    console.log(object);
  }

}
