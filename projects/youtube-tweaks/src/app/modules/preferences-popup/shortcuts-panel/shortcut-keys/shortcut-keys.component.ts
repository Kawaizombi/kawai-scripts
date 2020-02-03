import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'yt-tweaks-shortcut-keys',
  templateUrl: './shortcut-keys.component.html',
  styleUrls: ['./shortcut-keys.component.scss']
})
export class ShortcutKeysComponent implements OnChanges {
  @Input() shortcut: string;
  keys: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if(changes.shortcut) {
      this.keys = this.shortcut.split(' + ');
    }
  }
}
