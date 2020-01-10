import { Injectable } from '@angular/core';
import { HttpSnifferService } from '../http-sniffer/http-sniffer.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientIdInterceptor implements HttpInterceptor {
  constructor(
    private sniffer: HttpSnifferService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isApiRequest = new URL(req.url).host.indexOf('soundcloud.com') > -1;

    if(isApiRequest) {
      req = req.clone({
        params: req.params.set('client_id', this.sniffer.clientId),
      });
    }

    return next.handle(req);
  }
}
