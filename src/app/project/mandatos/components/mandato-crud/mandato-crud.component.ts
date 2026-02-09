import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Mandato, MandatoService } from '../../services/mandato.service';
import { MandatoManterComponent } from '../mandato-manter/mandato-manter.component';
import { MaterialNavigationModule } from '../../../../shared/material/material-navigation.module';
import { MandatoCargosListComponent } from '../mandato-cargos-list/mandato-cargos-list.component';
import { MandatoCargosListDlgComponent } from '../cargos-list-dlg/cargos-list-dlg.component';

@Component({
  selector: 'app-mandato-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MandatoManterComponent,
    MaterialNavigationModule,
    MandatoCargosListComponent
  ],
  templateUrl: './mandato-crud.component.html',
  styleUrls: ['./mandato-crud.component.scss']
})
export class MandatoCrudComponent extends BaseComponent implements OnInit {
  private mandatoService = inject(MandatoService);

  tipoEntidade = input.required<'CLUBE' | 'FEDERACAO' | 'CONFEDERACAO'>();
  entidade = input.required<any>();

  mandatos = signal<Mandato[]>([]);
  mandatoSelecionado = signal<Mandato | null>(null);
  modoEdicao = signal(false);

  mandatoAtivo = signal<Mandato>(null!);

  constructor() {
    super();
  }

  ngOnInit() {
    this.carregarMandatos();
  }

  carregarMandatos() {
    if(this.entidade()) {
      this.mandatos.set(this.entidade().mandatos || []);
      if(this.entidade()?.mandatoAtivo){
        this.mandatoAtivo.set(this.entidade().mandatoAtivo);
      }
    }
  }

  manterMandato(mandato: Mandato | null) {
    if(mandato === null) {
      this.mandatoSelecionado.set(null);
    } else {
      this.mandatoSelecionado.set(mandato);
    }
    this.modoEdicao.set(true);
  }

  salvarMandato() {

    this.carregarMandatos();
    this.modoEdicao.set(false);
  }

  cancelarEdicao() {
    this.modoEdicao.set(false);
  }

  abrirCargosDialog(mandato:Mandato) {
    this.matDialog.open(MandatoCargosListDlgComponent, {
      width: '1200px',
      disableClose:false,
      data: {
        mandato: mandato,
        mandatoTitulo: mandato.descricao
      }
    });
  }
}
