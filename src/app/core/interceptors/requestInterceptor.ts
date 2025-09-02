import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<
            HttpSentEvent
            | HttpHeaderResponse
            | HttpProgressEvent
            | HttpResponse<any>
            | HttpUserEvent<any>
        >{
        return next.handle(req);
    }
}
