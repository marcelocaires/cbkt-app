import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MySnackbarComponent } from './my-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class MySnackBarService {
   private snackBar=inject(MatSnackBar);

  public msgSucesso(msg:string){
    this.open(msg,"Success");
  };
  public msgErro(msg:string){
    this.open(msg,"Error");
  };
  public msgInfo(msg:string){
    this.open(msg,"Info");
  };
  public msgAlerta(msg:string){
    this.open(msg,"Warn");
  };

  public open(msg: string, snackType: string) {
    const _snackType: string = snackType !== undefined ? snackType : 'Success';
    this.snackBar.openFromComponent(MySnackbarComponent, {
      duration: 3600,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: msg, snackType: _snackType }
    });
  }

}
