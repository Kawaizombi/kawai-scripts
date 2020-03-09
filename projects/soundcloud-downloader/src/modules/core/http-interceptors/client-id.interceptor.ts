import { Injectable } from '@angular/core';
import { HttpSnifferService } from '../http-sniffer/http-sniffer.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CONFIG_TOKEN } from '../../../constants';

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
        params: req.params.set('client_id', this.getClientId()),
      });
    }

    return next.handle(req);
  }

  getClientId() {
    try {
      // in mobile version soundcloud use requirejs, so we can just read it straight from store
      return window['unsafeWindow'].require(CONFIG_TOKEN).get('client_id');
    } catch(e) {
      return this.sniffer.clientId;
    }
  }
}
