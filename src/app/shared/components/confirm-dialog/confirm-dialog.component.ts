import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialDialogModule } from '../../material/material-dialog.module';
import { MaterialLayoutModule } from '../../material/material-layout.module';
import { SharedModule } from '../../shared.module';


export interface ConfirmDialogData{
  title:string;
  alertMsg?:string;
  confirmMsg:string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports:[SharedModule,MaterialDialogModule,MaterialLayoutModule,MaterialButtonModule],
})
export class ConfirmDialogComponent{
  dados:ConfirmDialogData|null=null;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData){
  }
  confirmDialog(){
    this.dialogRef.close({event:'sim'});
  }
}
