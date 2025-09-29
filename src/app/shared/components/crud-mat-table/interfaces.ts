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
