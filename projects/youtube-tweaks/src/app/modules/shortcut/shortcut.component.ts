import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import eventToShortcut from './event-to-shortcut';
import { ShortcutService } from './shortcut.service';

@Component({
  selector: 'yt-tweaks-shortcut',
  template: '',
})
export class ShortcutComponent implements OnInit, OnDestroy {
  constructor(
    private shortcutService: ShortcutService,
  ) {
  }

  ngOnInit() {
    this.shortcutService.attach();
  }

  ngOnDestroy() {
    this.shortcutService.detach();
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    this.shortcutService.events.next(eventToShortcut($event));
  }
}
