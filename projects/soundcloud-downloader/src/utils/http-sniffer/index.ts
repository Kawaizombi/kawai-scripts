import { Observable } from 'rxjs';

const originalOpen = XMLHttpRequest.prototype.open;

export default function sniffer() {
  return new Observable((subscriber) => {
    XMLHttpRequest.prototype.open = function(...args) {
      originalOpen.apply(this, args);
      subscriber.next(args);
    };

    return () => {
      XMLHttpRequest.prototype.open = originalOpen;
    };
  });
}
