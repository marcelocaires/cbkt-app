import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { appinfo } from '../../../environments/appinfo';
import { environment as env } from '../../../environments/environment';
import { LoadingDialogService } from '../layout/components/loading-dialog/loading-dialog.service';

export const HttpInterceptor: HttpInterceptorFn=(req:HttpRequest<unknown>,next:HttpHandlerFn) => {
  const loadingService=inject(LoadingDialogService);

  const isMultipart=req.body instanceof FormData;
  const contentType=isMultipart?'multipart/form-data':'application/json';

  const headers={
    'appToken':appinfo.apiToken,
    'Access-Control-Allow-Origin': env.apiAuthUrl,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-cache',
    'Content-Type': contentType,
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  };

  loadingService.openDialog();
  return next(req).pipe(
    tap({
      next:()=>{},
      error:(err: any)=>{
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.error('Unauthorized request:', err);
          } else {
            console.error('HTTP error:', err);
          }
        } else {
          console.error('An error occurred:', err);
        }
        return throwError(() => err);
      },
      complete:()=>{},
      finalize:()=>{
        loadingService.hideDialog();
      }
    })
  );
};
