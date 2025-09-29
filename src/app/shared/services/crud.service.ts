import { Observable, catchError, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from './shared.service';

abstract class ResourceModel<T> {
  public id?: number;

  constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
  }
}

export class CrudService<T extends ResourceModel<T>>{

  http=inject(HttpClient);
  sharedService=inject(SharedService);

  constructor(
    protected urlPath:string,
    protected urlPathAll:string | null,
    protected objectSingularNoun:string,
    protected objectPluralNoun:string,
  ) { }

  public create(form:FormGroup<any>):Observable<T>{
    return this.http.post<T>(this.urlPath,form.value)
    .pipe(
      catchError(err => {
          console.log('Ocorreu um erro nesta requisição: ', err);
          return throwError(err);
      })
    );
  }
  public read():Observable<T[]>{
    return this.http.get<T[]>(this.urlPathAll?this.urlPathAll:this.urlPath);
  }

  public update(record:T):Observable<T>{
    return this.http.put<T>(`${this.urlPath}/${record.id}`,record)
    .pipe(
      catchError(err => {
          console.log('Ocorreu um erro nesta requisição: ', err);
          return throwError(err);
      })
    );
  }

  public delete(record:T){
    return this.http.delete(`${this.urlPath}/${record.id}`)
    .pipe(
      catchError(err => {
          console.log('Ocorreu um erro nesta requisição: ', err);
          return throwError(err);
      })
    );
  }
}
