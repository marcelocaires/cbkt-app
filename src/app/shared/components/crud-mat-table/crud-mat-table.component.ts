import { Component, EventEmitter, input, output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialFormModule } from '../../material/material-form.module';
import { MaterialLayoutModule } from '../../material/material-layout.module';
import { MaterialTableModule } from '../../material/material-table.module';
import { SharedModule } from '../../shared.module';
import { Util } from '../../util/util';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { FieldTypesEnum } from './enums';
import { ApiPageableResponse, CustomElementAction, customEventEmmiter, ElementCustomAction, MatTableColumnField } from './interfaces';

@Component({
  selector: 'app-crud-mat-table',
  templateUrl: './crud-mat-table.component.html',
  styleUrls: ['./crud-mat-table.component.scss'],
  standalone: true,
  imports:[
    SharedModule,
    MaterialTableModule,
    MaterialButtonModule,
    MaterialFormModule,
    MaterialLayoutModule
  ],
})
export class CrudMatTableComponent {
  crudName=input.required<string>();
  fieldColumns=input.required<MatTableColumnField[]>();
  data=input.required<any[]>();
  dataPageable=input<ApiPageableResponse|null>(null);
  msgDelete=input<string|null>(null);
  isPrintAll=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isExportAll=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isCreate=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isEdit=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isDelete=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isUpdate=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isPrint=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isExport=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isPageable=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  customElementActions=input<CustomElementAction[]>([]);
  customTableActions=input<CustomElementAction[]>([]);

  create=output();
  edit=output<any>();
  select=output<any>();
  delete=output<any>();
  update=output<any>();
  print=output<any>();
  printAll=output<any>();
  export=output<any>();
  exportAll=output<any>();
  customTableAction1=output();
  customTableAction2=output();
  customTableAction3=output();
  customTableAction4=output();
  customTableAction5=output();
  customElementAction1=output<any>();
  customElementAction2=output<any>();
  customElementAction3=output<any>();
  customElementAction4=output<any>();
  customElementAction5=output<any>();

  customEvents:customEventEmmiter[]=[];
  customActions:ElementCustomAction[]=[];

  displayedColumns: string[]=[];
  dataSource: MatTableDataSource<any>=new MatTableDataSource<any>();
  inputFilter:string="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.initColumns();
    if(this.isPageable() && this.dataPageable()){
      const dataPageable:ApiPageableResponse=this.dataPageable() || {
        content:[],
        pageable:{
          pageNumber:0,
          pageSize:0,
          sort:{empty:true,sorted:false,unsorted:true},
          offset:0,
          paged:true,
          unpaged:false
        },
        totalElements:0,
        totalPages:0,
        last:true,
        size:0,
        number:0,
        sort:{empty:true,sorted:false,unsorted:true},
        first:true,
        numberOfElements:0,
        empty:true
      };
      this.data.bind(dataPageable.content);
      this.dataSource = new MatTableDataSource(this.data());
      const page=new MatPaginator();
      page.length=dataPageable.totalElements || 0;
      page.pageIndex=dataPageable.pageable.pageNumber || 0;
      page.pageSize=dataPageable.pageable.pageSize || 10;
      //this.dataSource.paginator=page;
      const sort=new MatSort();
      sort.active=dataPageable.pageable.sort.sorted ? "": "";
      sort.direction=dataPageable.pageable.sort.sorted ? 'asc' : 'desc';
      //this.dataSource.sort=sort;
    }
    if(this.data()){
      this.dataSource = new MatTableDataSource(this.data());
    }
    this.customElementActions().forEach((action)=>{
      this.customEvents.push(
        {name:action.name,emitter:new EventEmitter<any>()}
      );
    });
  }

  editElement(element: any) {
    this.edit.emit(element);
  }

  private initColumns(){
    if(this.isEdit()){
      this.displayedColumns.push("edit");
    }
    this.fieldColumns().forEach((fieldColumn)=>{
      this.displayedColumns.push(fieldColumn.columnName);
    });
    this.displayedColumns.push("actions");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cleanFilter() {
    this.dataSource.filter = ""
    this.inputFilter="";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    const sortData=this.data().slice();
    const active=sort.active;
    let sortedData:any[]=[];
    sortedData = sortData.sort((a, b) => {
      let sortField:any=null;
      this.fieldColumns().forEach(f=>{
        if(active.startsWith(f.columnName)){
          sortField=f;
        }
      });

      if(sortField){
        return sortField.type===FieldTypesEnum.date
        ?Util.compareDate(a[sortField.field], b[sortField.field],isAsc)
        :(sortField.type==FieldTypesEnum.number
          ?Util.compareNumber(a[sortField.field], b[sortField.field],isAsc)
          :Util.compareString(a[sortField.field], b[sortField.field],isAsc)
        );
      }

      return 0;
    });

    this.dataSource=new MatTableDataSource(sortedData);
    this.dataSource.paginator=this.paginator;
  }

  createElement(){
    this.create.emit();
  }

  updateElement(element:any){
    this.update.emit(element);
  }

  deleteElement(element:any){
    let msg:any="Deseja realmente remover este "+this.crudName().toLocaleLowerCase()+"?";
    console.log(this.msgDelete());
    if(this.msgDelete()!=null){
      msg=this.msgDelete();
    }
    const confirmData:ConfirmDialogData={
      title:"Remover "+this.crudName(),
      alertMsg:"",
      confirmMsg:msg
    }
    const dialogRefConfirm = this.dialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '40%',
      disableClose: true,
      data:confirmData
    });

    dialogRefConfirm.afterClosed().subscribe(result => {
      if(result.event == 'sim'){
        this.delete.emit(element);
      }
    });
  }

  selectElement(element:any,action:any){
    this.select.emit({element:element,action:action});
  }

  printElement(element:any){
    this.print.emit(element);
  }
  printAllElements(){
    this.printAll.emit({
      filter:this.inputFilter,
      data:this.data
    });
  }
  exportElement(element:any){
    this.export.emit(element);
  }
  exportAllElements(){
    this.exportAll.emit(this.data);
  }

  public actionElement(action:CustomElementAction, element:any){
    if(action.function==="elementAction1"){
      this.elementAction1(element);
    }else if(action.function==="elementAction2"){
      this.elementAction2(element);
    }else if(action.function==="elementAction3"){
      this.elementAction3(element);
    }else if(action.function==="elementAction4"){
      this.elementAction4(element);
    }else if(action.function==="elementAction5"){
      this.elementAction5(element);
    }
  }
  elementAction1(element:any){
    this.customElementAction1.emit(element);
  }
  elementAction2(element:any){
    this.customElementAction2.emit(element);
  }
  elementAction3(element:any){
    this.customElementAction3.emit(element);
  }
  elementAction4(element:any){
    this.customElementAction4.emit(element);
  }
  elementAction5(element:any){
    this.customElementAction5.emit(element);
  }

  public actionTable(action:CustomElementAction){
    if(action.function==="tableAction1"){
      this.tableAction1();
    }else if(action.function==="tableAction2"){
      this.tableAction2();
    }else if(action.function==="tableAction3"){
      this.tableAction3();
    }else if(action.function==="tableAction4"){
      this.tableAction4();
    }else if(action.function==="tableAction5"){
      this.tableAction5();
    }
  }

  tableAction1(){
    this.customTableAction1.emit();
  }
  tableAction2(){
    this.customTableAction2.emit();
  }
  tableAction3(){
    this.customTableAction3.emit();
  }
  tableAction4(){
    this.customTableAction4.emit();
  }
  tableAction5(){
    this.customTableAction5.emit();
  }

}
