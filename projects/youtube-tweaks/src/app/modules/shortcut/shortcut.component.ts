import { Component, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import eventToShortcut from './event-to-shortcut';

@Component({
  selector: 'yt-tweaks-shortcut',
  template: '',
})
export class ShortcutComponent {
  @Input() events: Subject<string>;

  @HostListener('document:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    const { target } = $event;
    const fromInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

    if(!fromInput) {
      this.events.next(eventToShortcut($event));
    }
  }
}
