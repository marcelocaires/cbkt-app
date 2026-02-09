import { CommonModule } from '@angular/common';
import { Component, input, output, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Mandato, MandatoCargo } from '../../services/mandato.service';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';

@Component({
  selector: 'app-mandato-cargos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MaterialLayoutModule
  ],
  templateUrl: './mandato-cargos-list.component.html',
  styleUrls: ['./mandato-cargos-list.component.scss']
})
export class MandatoCargosListComponent {
  cargos = input.required<MandatoCargo[]>();
  modoEdicao = input<boolean>(false);

  removerOcupacao = output<MandatoCargo>();
  editarOcupacao = output<MandatoCargo>();

  constructor() {
    effect(() => {
      //console.log('Cargos atualizados:', this.cargos());
    });
  }

  onRemover(ocupacao: MandatoCargo) {
    this.removerOcupacao.emit(ocupacao);
  }

  onEditar(ocupacao: MandatoCargo) {
    this.editarOcupacao.emit(ocupacao);
  }
}
