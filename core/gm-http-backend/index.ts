import { Observable } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { GMXMLHttpRequestOptions, GMXMLHttpRequestResult } from './@types';
import { headerStringToObject } from './utils';
import { Injectable } from "@angular/core";

// eslint-disable-next-line @typescript-eslint/camelcase
declare function GM_xmlhttpRequest(options: GMXMLHttpRequestOptions): GMXMLHttpRequestResult;

@Injectable()
class GMBackend implements HttpHandler {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      const request = GM_xmlhttpRequest({
        url: req.urlWithParams,
        method: req.method,
        headers: req.headers,
        data: req.body,
        responseType: req.responseType,
        onprogress: (event) => {
          observer.next({
            type: HttpEventType.DownloadProgress,
            loaded: event.loaded,
            total: event.total,
          });
        },
        onload: (res) => {
          observer.next(new HttpResponse({
            headers: new HttpHeaders(headerStringToObject(res.responseHeaders)),
            body: res.response,
            status: res.status,
            statusText: res.statusText,
            url: res.finalUrl,
          }));
          observer.complete();
        },
        onerror: (err) => {
          observer.error(new HttpErrorResponse({
            error: err.response,
            headers: new HttpHeaders(headerStringToObject(err.responseHeaders)),
            status: err.status,
            statusText: err.statusText,
            url: err.finalUrl,
          }));
        },
      });

      observer.next({ type: HttpEventType.Sent });

      return () => request.abort();
    });
  }
}

export default GMBackend;
