import { Component, inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { CrudMatTableComponent } from '../../../../shared/components/crud-mat-table/crud-mat-table.component';
import { FieldTypesEnum } from '../../../../shared/components/crud-mat-table/enums';
import { MatTableColumnField } from '../../../../shared/components/crud-mat-table/interfaces';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Graduacao } from '../../model/graduacao';
import { GraduacaoStateTransferService } from '../../services/graduacao-state-transfer.service';
import { GraduacaoService } from '../../services/graduacao.service';

@Component({
  selector: 'app-graduacao',
  templateUrl: './graduacao.component.html',
  styleUrls: ['./graduacao.component.scss'],
  standalone: true,
  imports: [SharedModule,CrudMatTableComponent,MaterialProgressModule]
})
export class GraduacaoComponent extends BaseComponent implements OnInit {
  service=inject(GraduacaoService);
  transferService=inject(GraduacaoStateTransferService);
  graduacoes$=new Observable<Graduacao[]>();
  selectedGraduacao: Graduacao | null = null;
  columns: MatTableColumnField[]=[
    {field:'descricaoGraduacao', columnName:'Descrição', type:FieldTypesEnum.string, length: 200},
    {field:'grauNome', columnName:'Grau', type:FieldTypesEnum.string, length: 100},
    {field:'corNome', columnName:'Cor', type:FieldTypesEnum.string, length: 100},
    {field:'carencia', columnName:'Carência', type:FieldTypesEnum.number, length: 100},
    {field:'carenciaMenor', columnName:'Carência Menor', type:FieldTypesEnum.number, length: 100},
    {field:'valor', columnName:'Valor', type:FieldTypesEnum.number, length: 100},
  ];
  constructor() {
    super();
  }

  ngOnInit() {
    this.graduacoes$=this.service.read()
    .pipe(
      tap({
        next:(data)=>{
          console.log(data)
        },
      })
    );
  }

  edit(graduacao: Graduacao) {
    /*this.router.navigate([`/graduacao`], {
      queryParams: {object: JSON.stringify(graduacao)}
    });*/
    this.transferService.set(graduacao);
    this.router.navigate([`/graduacao`], {
      state: {graduacao}
    });
  }
  create() {
    this.router.navigate([`/graduacao`]);
  }
  sort(graduacoes: Graduacao[]): Graduacao[] {
    return graduacoes.sort((a, b) => {
      const grauA = a.grau?.toUpperCase() || '';
      const grauB = b.grau?.toUpperCase() || '';

      // Extrair se é DAN ou KYU e o número
      const isDanA = grauA.includes('DAN');
      const isDanB = grauB.includes('DAN');
      const isKyuA = grauA.includes('KYU');
      const isKyuB = grauB.includes('KYU');

      // Extrair o número do grau (assumindo formato como "1º DAN", "2º KYU", etc.)
      const numeroA = parseInt(grauA.match(/\d+/)?.[0] || '0');
      const numeroB = parseInt(grauB.match(/\d+/)?.[0] || '0');

      // Caso 1: Um é DAN e outro é KYU - DAN sempre vem primeiro
      if (isDanA && isKyuB) return 1;
      if (isKyuA && isDanB) return -1;

      // Caso 2: Ambos são DAN - ordenar por número crescente (1º DAN, 2º DAN, etc.)
      if (isDanA && isDanB) {
        return numeroA - numeroB;
      }

      // Caso 3: Ambos são KYU - ordenar por número decrescente (10º KYU, 9º KYU, etc.)
      if (isKyuA && isKyuB) {
        return numeroB - numeroA;
      }

      // Caso 4: Graduações que não são DAN nem KYU - ordenar alfabeticamente
      return grauA.localeCompare(grauB);
    });
  }
}
