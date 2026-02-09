import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { Mandato, MandatoCargo } from '../../services/mandato.service';
import { MandatoCargosListComponent } from '../mandato-cargos-list/mandato-cargos-list.component';

@Component({
  selector: 'app-cargos-list-dlg',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MandatoCargosListComponent
  ],
  templateUrl: './cargos-list-dlg.component.html',
  styleUrls: ['./cargos-list-dlg.component.scss']
})
export class MandatoCargosListDlgComponent {
  mandato: Mandato;

  constructor(
    public dialogRef: MatDialogRef<MandatoCargosListDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mandato: Mandato;}
  ) {
    this.mandato = data.mandato;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
