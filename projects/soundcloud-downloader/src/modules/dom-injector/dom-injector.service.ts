import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import domObserver, { ADD_TYPE, ofType, REMOVE_TYPE } from '../core/utils/dom-observer';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import combineCssSelectors from '../core/utils/combine-css-selectors';

const SOUND_ACTIONS_SELECTOR = combineCssSelectors(
  '.listenEngagement__footer .soundActions',
  '.sound__soundActions .soundActions',
);
const ROOT_ELEMENT_SELECTOR = '.sound__body';
const ROOT_URL_SELECTOR = '.soundTitle__title';
const ROOT_SELECTOR = '[role=main]';

const OBSERVER_OPTIONS: MutationObserverInit = { childList: true, subtree: true };

@Injectable({
  providedIn: 'root',
})
export class DomInjectorService {
  private rootSubscription = new Subscription();
  private mutations$ = domObserver(ROOT_SELECTOR, OBSERVER_OPTIONS)
    .pipe(
      filter(({ node }) => node instanceof HTMLElement),
    );
  private factory: ComponentFactory<DownloadButtonComponent>;
  private refs: ComponentRef<DownloadButtonComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    this.factory = this.componentFactoryResolver.resolveComponentFactory(DownloadButtonComponent);
  }

  enable() {
    const addSubscription = this.mutations$
      .pipe(
        ofType(ADD_TYPE),
        map(({ node }) => node as HTMLElement),
        map((el) => el.querySelector(SOUND_ACTIONS_SELECTOR)),
        filter<HTMLElement>(Boolean),
        filter((el) => !el.querySelector(this.factory.selector)),
      )
      .subscribe((el) => {
        const componentRef = this.factory.create(this.injector);
        const parent = el.closest(ROOT_ELEMENT_SELECTOR);
        const base = document.location.href;
        let url = base;

        if(parent) {
          const link = parent.querySelector<HTMLAnchorElement>(ROOT_URL_SELECTOR);
          url = new URL(link.href, base).href;
        }

        componentRef.instance.rootUrl = url;
        componentRef.changeDetectorRef.detectChanges();
        el.append(componentRef.location.nativeElement);
        this.refs.push(componentRef);
      });

    const removeSubscription = this.mutations$.pipe(
      ofType(REMOVE_TYPE),
      map(({ node }) => node as HTMLElement),
      map((el) => el.querySelectorAll(this.factory.selector)),
    ).subscribe((list) => {
      Array.from(list).forEach((el) => {
        const ref = this.refs.find((ref) => ref.location.nativeElement === el);
        ref.destroy();
        this.refs.splice(this.refs.indexOf(ref), 1);
      })
    });

    this.rootSubscription.add(addSubscription);
    this.rootSubscription.add(removeSubscription);
  }

  disable() {
    this.rootSubscription.unsubscribe();
  }
}
