import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CONFIG_TOKEN } from '../../../constants';

// It work even without this interceptor
// but just in case, and also to mimic actual app
@Injectable({
  providedIn: 'root',
})
export class AppVersionInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isApiRequest = new URL(req.url).host.indexOf('soundcloud.com') > -1;
    const appVersion = this.getAppVersion();

    if(isApiRequest && appVersion) {
      req = req.clone({
        params: req.params.set('app_version', appVersion),
      });
    }

    return next.handle(req);
  }

  getAppVersion() {
    try {
      return window['unsafeWindow'].require(CONFIG_TOKEN).get('app_version');
    } catch(e) {
      return window['unsafeWindow'].__sc_version;
    }
  }
}
