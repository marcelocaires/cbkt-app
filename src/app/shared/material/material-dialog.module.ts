import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  exports: [
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBottomSheetModule,
  ],
})
export class MaterialDialogModule {}