import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { BaseComponent } from './base.component';

@Component({
    selector: 'app-base-dialog',
    standalone: true,
    imports: [SharedModule],
    template: ""
})
export class BaseDialogComponent<T> extends BaseComponent{
  protected dialogRef=inject(MatDialogRef<T>);
  protected data:any=inject<any>(MAT_DIALOG_DATA);
}


