import { Component, EventEmitter, inject, input, output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialFormModule } from '../../material/material-form.module';
import { MaterialLayoutModule } from '../../material/material-layout.module';
import { MaterialTableModule } from '../../material/material-table.module';
import { SharedModule } from '../../shared.module';
import { Util } from '../../util/util';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { MySnackBarService } from '../my-snackbar-component/my-snackbar.service';
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
  msgService=inject(MySnackBarService);

  crudName=input.required<string>();
  fieldColumns=input.required<MatTableColumnField[]>();
  data=input.required<any>();
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
  matSortActive=input<string>("");
  matSortDirection=input<'asc'|'desc'|"">("");
  pageFilter=input<any>();

  create=output();
  edit=output<any>();
  select=output<any>();
  delete=output<any>();
  update=output<any>();
  print=output<any>();
  printAll=output<any>();
  export=output<any>();
  exportAll=output<any>();
  pageEvent=output<PageEvent>();
  sortEvent=output<Sort>();
  filterEvent=output<string>();
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
  inputFilter:any="";
  dataPageable:ApiPageableResponse|null=null;
  pageLength:number=0;
  pageSize:number=10;
  pageIndex:number=0;
  pageSizeOptions=[5, 10, 15];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog){}

  ngAfterViewInit(): void {
    if(!this.isPageable()){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.pageFilter()!=null && this.pageFilter()!=undefined && this.pageFilter()!==""){
      console.log("filter",this.pageFilter());
      this.inputFilter=this.pageFilter()?this.pageFilter():"";
    }
  }

  ngOnInit(): void {
    this.initColumns();
    if(this.isPageable() && this.data()){
      const dataPageable:ApiPageableResponse=this.data();
      this.dataPageable=dataPageable;
      this.dataSource = new MatTableDataSource(this.dataPageable.content);
      this.pageIndex=this.dataPageable?.pageable?.pageNumber || 0;
      this.pageSize=this.dataPageable?.pageable?.pageSize || 10;
      this.pageLength=this.dataPageable?.totalElements || 0;
    }else if(this.data()){
      this.dataSource = new MatTableDataSource(this.data());
    }
    this.customElementActions().forEach((action)=>{
      this.customEvents.push(
        {name:action.name,emitter:new EventEmitter<any>()}
      );
    });
  }

  onPage($event: PageEvent) {
    if(!this.isPageable()){
      return;
    }
    this.pageIndex=$event.pageIndex;
    this.pageSize=$event.pageSize;
    this.pageLength=$event.length;
    this.pageEvent.emit($event);
  }

  editElement(element: any) {
    this.edit.emit(element);
  }

  private initColumns(){
    if(this.isEdit()){
      this.displayedColumns.push("edit");
    }
    this.fieldColumns().forEach((fieldColumn)=>{
      let columnName="";
      if(fieldColumn.type==FieldTypesEnum.corHex){
        columnName="borderCorHex";
        fieldColumn.columnName=columnName
      }else{
        columnName=fieldColumn.columnName;
      }
      this.displayedColumns.push(columnName);
    });
    this.displayedColumns.push("actions");
    this.sortColumns();
  }

  private sortColumns(){
    this.displayedColumns=this.displayedColumns.sort((a, b) => {
      if (a === "borderCorHex") return -1;  // "Cor" vai para o início
      if (b === "borderCorHex") return 1;   // "cor" vai para o início
      return 0;                  // mantém ordem original dos outros
    });
  }

  applyFilter() {
    const filterValue = this.inputFilter.trim().toLowerCase();
    if(this.isPageable()){
      this.filterEvent.emit(filterValue);
      return;
    }
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cleanFilter() {
    this.dataSource.filter = ""
    this.inputFilter="";
    if(this.isPageable()){
      this.filterEvent.emit("");
      return;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSort(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    let data:any[]=[];
    if(this.isPageable()){
      this.sortEvent.emit(sort);
      this.dataSource=new MatTableDataSource();
    }else{
      data=this.data();
      const isAsc = sort.direction === 'asc';
      const sortData=data.slice();
      const active=sort.active;
      let sortedData:any[]=[];
      sortedData = sortData.sort((a, b) => {
        let sortField:any=null;
        this.fieldColumns().forEach(f=>{
          if(active.startsWith(f.field)){
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
