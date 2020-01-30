import { Component, HostListener } from '@angular/core';
import keyEventToString from 'key-event-to-string';
import { Subject } from 'rxjs';

@Component({
  selector: 'yt-tweaks-hotkey-listener',
  templateUrl: './hotkey-listener.component.html',
  styleUrls: ['./hotkey-listener.component.scss']
})
export class HotkeyListenerComponent {
  private event2string = keyEventToString();
  hotkeys = new Subject<string>();

  @HostListener('document:keypress', ['$event'])
  onKeyPress($event) {
    this.hotkeys.next(this.event2string($event))
  }
}
