import { Component, HostListener } from '@angular/core';
import eventToShortcut from './event-to-shortcut';
import { ShortcutService } from './shortcut.service';

@Component({
  selector: 'yt-tweaks-shortcut',
  template: '',
})
export class ShortcutComponent {
  constructor(
    private shortcutService: ShortcutService,
  ) {
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    const { target } = $event;
    const fromInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

    if(!fromInput) {
      this.shortcutService.events.next(eventToShortcut($event));
    }
  }
}
