import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudMatTableComponent } from '../../../../shared/components/crud-mat-table/crud-mat-table.component';
import { FieldTypesEnum } from '../../../../shared/components/crud-mat-table/enums';
import { MatTableColumnField } from '../../../../shared/components/crud-mat-table/interfaces';
import { SharedModule } from '../../../../shared/shared.module';
import { Graduacao } from '../../model/graduacao';
import { GraduacaoService } from '../../services/graduacao.service';

@Component({
  selector: 'app-graduacao',
  templateUrl: './graduacao.component.html',
  styleUrls: ['./graduacao.component.scss'],
  standalone: true,
  imports: [SharedModule,CrudMatTableComponent]
})
export class GraduacaoComponent implements OnInit {
  service=inject(GraduacaoService);
  graduacoes$=new Observable<Graduacao[]>();
  columns: MatTableColumnField[]=[
      {field:'id', columnName:'ID', type:FieldTypesEnum.number, length: 70},
      {field:'descricaoGraduacao', columnName:'Descrição', type:FieldTypesEnum.string, length: 200},
      {field:'carencia', columnName:'Carência', type:FieldTypesEnum.number, length: 100}
  ];
  constructor() { }

  ngOnInit() {
    this.graduacoes$=this.service.read();
  }


}
