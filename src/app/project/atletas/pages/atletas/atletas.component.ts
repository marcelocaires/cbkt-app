import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { CrudMatTableComponent } from '../../../../shared/components/crud-mat-table/crud-mat-table.component';
import { FieldTypesEnum } from '../../../../shared/components/crud-mat-table/enums';
import { ApiPageableResponse, MatTableColumnField } from '../../../../shared/components/crud-mat-table/interfaces';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletasService } from '../../services/atletas.service';

@Component({
  selector: 'app-atletas',
  standalone: true,
  imports: [CrudMatTableComponent,SharedModule],
  templateUrl: './atletas.component.html',
  styleUrl: './atletas.component.scss'
})
export class AtletasComponent extends BaseComponent{
  atletasService=inject(AtletasService);
  atletasPage$=new Observable<ApiPageableResponse>();
  columns:MatTableColumnField[]=[
    {field:'nome',columnName:'Nome',type:FieldTypesEnum.string},
    {field:'email',columnName:'Email',type:FieldTypesEnum.string},
    {field:'dataNascimento',columnName:'Data de Nascimento',type:FieldTypesEnum.date},
    {field:'cpf',columnName:'CPF',type:FieldTypesEnum.string},
    {field:'telefone',columnName:'Telefone',type:FieldTypesEnum.string}
  ];
  ngOnInit(): void {
    this.loadAtletasPage();
  }
  loadAtletasPage(){
    this.atletasPage$=this.atletasService.getAllPage({page:0,size:10,sort:'nomeAtleta'});
  }
}
