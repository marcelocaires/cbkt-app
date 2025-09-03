import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialButtonModule } from '../../material/material-button.module';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'my-snackbar',
    templateUrl: './my-snackbar.component.html',
    styleUrls: ['./my-snackbar.component.scss'],
    imports: [SharedModule,MaterialButtonModule],
    standalone: true
})
export class MySnackbarComponent implements OnInit {

  msg:string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.msg=data.message.trimStart().trimEnd();;
  }

  ngOnInit() {}

  get getIcon():string {
    switch (this.data.snackType) {
      case 'Success':
        return 'check_circle';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'notifications';
    }
    return "";
  }

 getSnackClass():string {
    switch (this.data.snackType) {
      case 'Success':
        return 'snackBar success';
      case 'Error':
        return 'snackBar error';
      case 'Warn':
        return 'snackBar warn';
      case 'Info':
        return 'snackBar info';
    }
    return "";
  }
  getMsgClass():string {
    switch (this.data.snackType) {
      case 'Success':
        return 'snackMsg success';
      case 'Error':
        return 'snackMsg error';
      case 'Warn':
        return 'snackMsg warn';
      case 'Info':
        return 'snackMsg info';
    }
    return "";
  }
  getIconeClass():string {
    switch (this.data.snackType) {
      case 'Success':
        return 'snackIcone success';
      case 'Error':
        return 'snackIcone error';
      case 'Warn':
        return 'snackIcone warn';
      case 'Info':
        return 'snackIcone info';
    }
    return "";
  }

}
