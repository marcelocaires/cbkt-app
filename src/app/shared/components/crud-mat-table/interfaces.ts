import { FieldTypesEnum } from "./enums";

export interface MatTableColumnField{
  field:string;
  columnName: string;
  type: FieldTypesEnum;
  length?:number;
}
export interface CustomElementAction{
  name:string,
  icon:string,
  function:string,
  dialog?:any,
  show?:boolean
}
export interface ElementCustomAction{
  name: string,
  emitter: any
}

export interface customEventEmmiter{
  name:string,
  emitter: any
}

export interface ApiPageableResponse {
  content: any[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
