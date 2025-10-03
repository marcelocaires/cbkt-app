import { Injectable, inject } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { LoadingDialogComponent } from './loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService {
  private opened = false;
  private dialogRef: MatDialogRef<LoadingDialogComponent>|null=null;
  private dialog: MatDialog=inject(MatDialog);

  openDialog(): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.dialog.open(LoadingDialogComponent, {
        data: undefined,
        maxHeight: "100%",
        width: "50px",
        height:"50px",
        maxWidth: "100%",
        disableClose: true,
        hasBackdrop: true,
        panelClass: 'transparent-loading'
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }

  hideDialog() {
    if(this.dialogRef) this.dialogRef.close();
  }
}
