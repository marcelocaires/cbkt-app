import { Component, inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CrudMatTableComponent } from '../../../../shared/components/crud-mat-table/crud-mat-table.component';
import { FieldTypesEnum } from '../../../../shared/components/crud-mat-table/enums';
import { MatTableColumnField } from '../../../../shared/components/crud-mat-table/interfaces';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Graduacao } from '../../model/graduacao';
import { GraduacaoService } from '../../services/graduacao.service';
import { GraduacaoCrudComponent } from '../graduacao-crud/graduacao-crud.component';

@Component({
  selector: 'app-graduacao',
  templateUrl: './graduacao.component.html',
  styleUrls: ['./graduacao.component.scss'],
  standalone: true,
  imports: [SharedModule,CrudMatTableComponent,MaterialProgressModule,GraduacaoCrudComponent]
})
export class GraduacaoComponent implements OnInit {
  service=inject(GraduacaoService);
  graduacoes$=new Observable<Graduacao[]>();
  selectedGraduacao: Graduacao | null = null;
  columns: MatTableColumnField[]=[
      {field:'id', columnName:'ID', type:FieldTypesEnum.number, length: 70},
      {field:'descricaoGraduacao', columnName:'Descrição', type:FieldTypesEnum.string, length: 200},
      {field:'carencia', columnName:'Carência', type:FieldTypesEnum.number, length: 100},
      {field:'grau', columnName:'Grau', type:FieldTypesEnum.string, length: 100},
      {field:'corNome', columnName:'Cor', type:FieldTypesEnum.string, length: 100},
      {field:'corCodigo', columnName:'Cor Código', type:FieldTypesEnum.string, length: 100},
      {field:'valor', columnName:'Valor', type:FieldTypesEnum.number, length: 100},
  ];
  constructor() { }

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


}
