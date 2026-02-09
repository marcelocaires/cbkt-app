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
import { Clube } from '../../../atleta/models/atleta.model';
import { ClubeService } from '../../services/clube.service';

@Component({
  selector: 'app-clubes-list',
  standalone: true,
  imports: [CrudMatTableComponent, SharedModule, PageTitleComponent],
  templateUrl: './clubes-list.component.html',
  styleUrl: './clubes-list.component.scss'
})
export class ClubesListComponent extends BaseComponent {
  clubeService = inject(ClubeService);
  clubesPage$ = new Observable<ApiPageableResponse>();
  columns: MatTableColumnField[] = [
    { field: 'nome', columnName: 'Nome', type: FieldTypesEnum.string },
    { field: 'abreviatura', columnName: 'Abreviatura', type: FieldTypesEnum.string },
    { field: 'classificacao', columnName: 'Classificação', type: FieldTypesEnum.string },
    { field: 'responsavel', columnName: 'Responsável', type: FieldTypesEnum.string },
    { field: 'telefone', columnName: 'Telefone', type: FieldTypesEnum.string },
    { field: 'email', columnName: 'E-mail', type: FieldTypesEnum.string }
  ];

  sortActive: string = "nome";
  sortDirection: "asc" | "desc" = "asc";
  filtro: string = "";

  ngOnInit(): void {
    this.loadClubesPage();
  }

  convertData(data: ApiPageableResponse): ApiPageableResponse {
    const content = data.content.map((clube: Clube) => ({
      id: clube.id,
      nome: clube.nome,
      abreviatura: clube.abreviatura ? clube.abreviatura : '',
      classificacao: clube.classificacao ? clube.classificacao : '',
      responsavel: clube.diretoria?.responsavel ? clube.diretoria.responsavel : '',
      telefone: clube.contato?.telefone ? clube.contato.telefone : '',
      email: clube.contato?.email ? clube.contato.email : ''
    }));
    data.content = content;
    return data;
  }

  loadClubesPage() {
    const sort = `${this.sortActive},${this.sortDirection}`;
    this.clubesPage$ = this.clubeService.getAllPage({ page: 0, size: 10, sort: sort });
  }

  pageEvent(event: PageEvent) {
    const dir = this.sortDirection;
    const sort = `nome,${dir}`;
    this.sortDirection = dir;
    if (this.filtro.length > 0) {
      this.clubesPage$ = this.clubeService.getAllPage({ page: event.pageIndex, size: event.pageSize, sort: sort, filter: this.filtro });
      return;
    }
    this.clubesPage$ = this.clubeService.getAllPage({ page: event.pageIndex, size: event.pageSize, sort: sort });
  }

  sortEvent($event: Sort) {
    const dir = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortDirection = dir;
    this.sortActive = $event.active;
    const sort = `${$event.active},${dir}`;
    if (this.filtro.length > 0) {
      this.clubesPage$ = this.clubeService.getAllPage({ page: 0, size: 10, sort: sort, filter: this.filtro });
      return;
    }
    this.clubesPage$ = this.clubeService.getAllPage({ page: 0, size: 10, sort: sort });
  }

  filterEvent(filterValue: string) {
    this.filtro = filterValue;
    this.clubesPage$ = this.clubeService.getAllPage({ page: 0, size: 10, sort: 'nome,asc', filter: this.filtro });
  }

  create() {
    this.router.navigate(['/clube-crud']);
  }

  edit($event: any) {
    this.router.navigate(['/clube-crud/' + $event.id]);
  }
}
