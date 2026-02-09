import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { CrudService } from '../../shared/services/crud.service';

export interface UploadFileRequest {
  id: number;
  file:any
}

export interface UploadFileResponse  {
  key: string;
  objectUrl: string;
  extension: string;
}

export interface GetUrlResponse  {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class OsService extends CrudService<UploadFileRequest>{

  private readonly urlUploadFotoAtleta = `${this.urlPath}/files/upload/foto/atleta/`;
  private readonly urlUploadLaudoMedicoAtleta = `${this.urlPath}/files/upload/rel-med/atleta/`;
  private readonly urlGetFotoAtleta = `${this.urlPath}/files/url/foto/atleta/`;
  private readonly urlGetLaudoMedicoAtleta = `${this.urlPath}/files/url/rel-med/atleta/`;

  constructor() {
    const apiUrl = `${env.apiOsUrl}`;
    super(
      apiUrl,
      apiUrl,
      'Object Storage',
      'Object Storage'
    );
  }

  uploadFotoAtleta(request: UploadFileRequest): Observable<UploadFileResponse> {
    const formData=new FormData();
    formData.append('file',request.file);
    return this.http.post<UploadFileResponse>(`${this.urlUploadFotoAtleta}${request.id}`, formData);
  }

  getUrlFotoAtleta(idAtleta:number): Observable<GetUrlResponse> {
    return this.http.get<GetUrlResponse>(`${this.urlGetFotoAtleta}${idAtleta}`);
  }

  uploadLaudoMedicoAtleta(request: UploadFileRequest): Observable<UploadFileResponse> {
    const formData=new FormData();
    formData.append('file',request.file);
    return this.http.post<UploadFileResponse>(`${this.urlUploadLaudoMedicoAtleta}${request.id}`, formData);
  }

  getUrlLaudoMedicoAtleta(idAtleta:number): Observable<GetUrlResponse> {
    return this.http.get<GetUrlResponse>(`${this.urlGetLaudoMedicoAtleta}${idAtleta}`);
  }

}
