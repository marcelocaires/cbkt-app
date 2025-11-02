import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { CrudMatTableComponent } from '../../../../shared/components/crud-mat-table/crud-mat-table.component';
import { FieldTypesEnum } from '../../../../shared/components/crud-mat-table/enums';
import { ApiPageableResponse, MatTableColumnField } from '../../../../shared/components/crud-mat-table/interfaces';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletaShort } from '../../models/atleta-short';
import { AtletasService } from '../../services/atletas.service';

@Component({
  selector: 'app-atletas',
  standalone: true,
  imports: [CrudMatTableComponent,SharedModule,PageTitleComponent],
  templateUrl: './atletas.component.html',
  styleUrl: './atletas.component.scss'
})
export class AtletasComponent extends BaseComponent{
  atletasService=inject(AtletasService);
  atletasPage$=new Observable<ApiPageableResponse>();
  columns:MatTableColumnField[]=[
    {field:'corHex',columnName:'Cor',type:FieldTypesEnum.corHex},
    {field:'nomeAtleta',columnName:'Nome',type:FieldTypesEnum.string},
    {field:'graduacaoDescricao',columnName:'Graduação',type:FieldTypesEnum.string},
    {field:'nomeClube',columnName:'Clube',type:FieldTypesEnum.string}
  ];

  sortActive:string="nomeAtleta";
  sortDirection:"asc"|"desc"="asc";
  filtro:string="";

  ngOnInit(): void {
    this.loadAtletasPage();
  }

  convertData(data:ApiPageableResponse):ApiPageableResponse{
    const content = data.content.map((atleta:AtletaShort) => ({
      id: atleta.id,
      nomeAtleta: atleta.nomeAtleta,
      graduacaoDescricao: atleta.graduacaoDescricao,
      nomeClube: atleta.nomeClube,
      corHex: atleta.graduacaoCorHex
    }));
    data.content = content;
    return data;
  }
  loadAtletasPage(){
    const sort = `${this.sortActive},${this.sortDirection}`;
    this.atletasPage$=this.atletasService.getAllPage({page:0,size:10,sort:sort});
  }
  pageEvent(event:PageEvent){
    const dir=this.sortDirection;
    const sort = `nomeAtleta,${dir}`;
    this.sortDirection=dir;
    if(this.filtro.length>0){
      this.atletasPage$=this.atletasService.getAllPage({page:event.pageIndex,size:event.pageSize,sort:sort,filter:this.filtro});
      return;
    }
    this.atletasPage$=this.atletasService.getAllPage({page:event.pageIndex,size:event.pageSize,sort:sort});
  }
  sortEvent($event: Sort) {
    const dir=this.sortDirection==='asc'?'desc':'asc';
    this.sortDirection=dir;
    this.sortActive=$event.active;
    const sort = `${$event.active},${dir}`;
    if(this.filtro.length>0){
      this.atletasPage$=this.atletasService.getAllPage({page:0,size:10,sort:sort,filter:this.filtro});
      return;
    }
    this.atletasPage$=this.atletasService.getAllPage({page:0,size:10,sort:sort});
  }
  filterEvent(filterValue: string) {
    this.filtro=filterValue;
    this.atletasPage$ = this.atletasService.getAllPage({page:0,size:10,sort:'nomeAtleta,asc',filter:this.filtro});
  }
  create() {
    this.router.navigate(['/atleta-crud']);
  }
  edit($event: any) {
    this.router.navigate(['/atleta-crud/'+$event.id]);
  }
}
