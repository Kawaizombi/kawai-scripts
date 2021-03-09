import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import domObserver, { ADD_TYPE, ofType, REMOVE_TYPE } from '../core/utils/dom-observer';
import { filter, map, switchMap } from 'rxjs/operators';
import { from, Subscription } from 'rxjs';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import combineCssSelectors from '../core/utils/combine-css-selectors';

const SOUND_ACTIONS_SELECTOR = combineCssSelectors(
  '.listenEngagement__footer .soundActions', // desktop ver sound page
  '.sound__soundActions .soundActions', // desktop ver search page
  '.soundBadge .soundBadge__indicator', // mobile ver search page
  '.playlistBadge .g-badge-info', // mobile ver main page
  '.sound__info', // mobile ver sound page
);
const ROOT_ELEMENT_SELECTOR = combineCssSelectors('.searchItem', '.sound__body');
const ROOT_URL_SELECTOR = combineCssSelectors('.soundTitle__title', '.g-badge-link');
const ROOT_SELECTOR = '#app';

const OBSERVER_OPTIONS: MutationObserverInit = { childList: true, subtree: true };

@Injectable({
  providedIn: 'root',
})
export class DomInjectorService {
  private rootSubscription = new Subscription();
  private mutations$ = domObserver(ROOT_SELECTOR, OBSERVER_OPTIONS).pipe(
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

  private injectDownloadButton(el: Element) {
    const componentRef = this.factory.create(this.injector);
    const parent = el.closest(ROOT_ELEMENT_SELECTOR);
    const base = document.location.href;
    let url = base;

    if(parent) {
      const link = parent.querySelector<HTMLAnchorElement>(ROOT_URL_SELECTOR);
      url = new URL(link.href, base).href;
    }

    el.append(componentRef.location.nativeElement);

    componentRef.instance.rootUrl = url;
    componentRef.changeDetectorRef.detectChanges();

    this.refs.push(componentRef);
  }

  enable() {
    Array.from(document.querySelectorAll(SOUND_ACTIONS_SELECTOR)).forEach((el) => this.injectDownloadButton(el));

    const addSubscription = this.mutations$
      .pipe(
        ofType(ADD_TYPE),
        map(({ node }) => node as HTMLElement),
        switchMap((el) => from(el.querySelectorAll(SOUND_ACTIONS_SELECTOR))),
        filter((el) => !el.querySelector(this.factory.selector)),
      )
      .subscribe((el) => this.injectDownloadButton(el));

    const removeSubscription = this.mutations$.pipe(
      ofType(REMOVE_TYPE),
      map(({ node }) => node as HTMLElement),
      map((el) => el.querySelectorAll(this.factory.selector)),
    ).subscribe((list) => {
      Array.from(list).forEach((el) => {
        const ref = this.refs.find((ref) => ref.location.nativeElement === el);
        ref.destroy();
        this.refs.splice(this.refs.indexOf(ref), 1);
      });
    });

    this.rootSubscription.add(addSubscription);
    this.rootSubscription.add(removeSubscription);
  }

  disable() {
    this.rootSubscription.unsubscribe();
  }
}
