import { Component } from '@angular/core';
import { CrudMatTableComponent } from '../../shared/components/crud-mat-table/crud-mat-table.component';
import { FieldTypesEnum } from '../../shared/components/crud-mat-table/enums';
import { MatTableColumnField } from '../../shared/components/crud-mat-table/interfaces';
import { MyTableItem } from './my-table-datasource';

const EXAMPLE_DATA: MyTableItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

@Component({
    selector: 'app-my-table',
    templateUrl: './my-table.component.html',
    standalone: true,
    imports: [CrudMatTableComponent]
})
export class MyTableComponent{

  dados=EXAMPLE_DATA;
  fieldColumns:MatTableColumnField[]=[
    {field:'id',columnName:'ID',type:FieldTypesEnum.number},
    {field:'name',columnName:'Name',type:FieldTypesEnum.string}
  ];
}
