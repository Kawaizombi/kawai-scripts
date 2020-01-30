import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export interface ShortcutHandler {
  handle(shortcut: string): void;
}

export const SHORTCUT = new InjectionToken<ShortcutHandler>('SHORTCUT');

@Injectable({
  providedIn: 'root'
})
export class ShortcutService {
  private rootSub = new Subscription();
  public events = new Subject<string>();

  constructor(
    @Inject(SHORTCUT) private shortcuts: ShortcutHandler[],
  ) {
  }

  attach() {
    const subs = this.shortcuts.map((provider) => {
      return this.events.subscribe((shortcut) => provider.handle(shortcut));
    });

    subs.forEach((sub) => this.rootSub.add(sub));
  }

  detach() {
    this.rootSub.unsubscribe();
  }
}
