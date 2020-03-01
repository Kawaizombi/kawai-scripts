import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpSnifferService {
  private snifferSubscription = new Subscription();

  clientId: string;

  enable() {
    this.snifferSubscription = this.attach()
      .pipe(
        map(([, url]) => url),
        map((url) => new URLSearchParams(url).get('client_id')),
        filter(Boolean),
      )
      .subscribe((clientId: string) => {
        this.clientId = clientId;
      });
  }

  disable() {
    this.snifferSubscription.unsubscribe();
  }

  private attach() {
    return new Observable<any[]>((subscriber) => {
      XMLHttpRequest.prototype.open = function(...args) {
        HttpSnifferService.originalOpen.apply(this, args);
        subscriber.next(args);
      };

      return HttpSnifferService.restore;
    });
  }

  private static originalOpen = XMLHttpRequest.prototype.open;

  private static restore() {
    XMLHttpRequest.prototype.open = HttpSnifferService.originalOpen;
  }
}
