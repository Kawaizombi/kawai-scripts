import { Injectable } from '@angular/core';
import { ShortcutHandler } from '../shortcut.service';
import { Store } from '@ngxs/store';
import { PlayerService } from '../../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class SpeedShortcutService implements ShortcutHandler {
  constructor(
    private store: Store,
    private playerService: PlayerService,
  ) {
  }

  handle(shortcut) {
    const speed = this.playerService.getSpeed();
    const { SPEED_UP, SPEED_DOWN } = this.store.selectSnapshot(({ shortcuts }) => shortcuts);

    if(SPEED_UP === shortcut) {
      this.playerService.setSpeed(speed + 0.25);
    } else if(SPEED_DOWN === shortcut) {
      this.playerService.setSpeed(speed - 0.25);
    }
  }
}
