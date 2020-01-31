import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import eventToShortcut from '../../../shortcut/event-to-shortcut';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

@Component({
  selector: 'yt-tweaks-shortcut-edit',
  templateUrl: './shortcut-edit.component.html',
  styleUrls: ['./shortcut-edit.component.scss'],
})
export class ShortcutEditComponent{
  faTimes = faTimes;
  faCheck = faCheck;
  @Input() shortcut: string;
  @Output() shortcutChange = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();


  @HostListener('document:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if($event.code === 'Enter') {
      this.shortcutChange.emit(this.shortcut);
    } else {
      this.shortcut = eventToShortcut($event);
    }
  }

}
