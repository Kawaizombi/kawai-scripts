import {
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ShortcutComponent } from './shortcut.component';

export interface ShortcutHandler {
  handle(shortcut: string): void;
}

export const SHORTCUT = new InjectionToken<ShortcutHandler>('SHORTCUT');

@Injectable({
  providedIn: 'root',
})
export class ShortcutService {
  private readonly factory: ComponentFactory<ShortcutComponent>;
  private shortcutListener: ComponentRef<ShortcutComponent>;
  private rootSub = new Subscription();
  public events = new Subject<string>();

  constructor(
    @Inject(SHORTCUT) private shortcuts: ShortcutHandler[],
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    this.factory = this.componentFactoryResolver.resolveComponentFactory(ShortcutComponent);
  }

  private buildShortcutListener() {
    this.shortcutListener = this.factory.create(this.injector);
    document.body.append(this.shortcutListener.location.nativeElement);
    this.shortcutListener.changeDetectorRef.detectChanges();
  }

  attach() {
    if(!this.shortcutListener) {
      const subs = this.shortcuts.map((provider) => {
        return this.events.subscribe((shortcut) => provider.handle(shortcut));
      });

      subs.forEach((sub) => this.rootSub.add(sub));
      this.buildShortcutListener();
    }
  }

  detach() {
    if(this.shortcutListener) {
      this.rootSub.unsubscribe();
      this.shortcutListener.destroy();
      this.shortcutListener.location.nativeElement.remove();
      this.shortcutListener = null;
    }
  }
}
