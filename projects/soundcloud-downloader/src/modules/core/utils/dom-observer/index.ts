import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const ADD_TYPE = 'ADD';
export const REMOVE_TYPE = 'REMOVE';

type EventType = typeof ADD_TYPE | typeof REMOVE_TYPE;

interface Event {
  type: EventType;
  node: Node;
}

export const ofType = (t: EventType) => filter<Event>(({ type }) => t === type);

export default function domObserver(el: string | Element, options: MutationObserverInit) {
  return new Observable<Event>((subscriber) => {
    const _el = typeof el === 'string' ? document.querySelector(el) : el;
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        Array.from(record.addedNodes).forEach((node) => subscriber.next({ type: ADD_TYPE, node }));
        Array.from(record.removedNodes).forEach((node) => subscriber.next({ type: REMOVE_TYPE, node }));
      });
    });

    observer.observe(_el, options);

    return () => observer.disconnect();
  });
}
