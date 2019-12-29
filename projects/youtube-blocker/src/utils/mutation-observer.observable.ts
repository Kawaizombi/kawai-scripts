import { Observable } from 'rxjs';

const createMutationObserver = (el: Element, observerOptions: MutationObserverInit) => {
  return new Observable<MutationRecord>((subscriber) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => subscriber.next(mutation));
    });

    observer.observe(el, observerOptions);

    return () => observer.disconnect();
  });
};

export default createMutationObserver;
