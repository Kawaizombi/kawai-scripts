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
    const { SPEED_UP, SPEED_DOWN, SPEED_RESET } = this.store.selectSnapshot(({ shortcuts }) => shortcuts);

    switch(shortcut) {
      case SPEED_UP: {
        this.playerService.setSpeed(speed + 0.25);
        break;
      }

      case SPEED_DOWN: {
        this.playerService.setSpeed(speed - 0.25);
        break;
      }

      case SPEED_RESET: {
        const defaultSpeed = this.store.selectSnapshot(({ preferences }) => preferences.defaultSpeed);
        this.playerService.setSpeed(defaultSpeed);
        break;
      }
    }
  }
}
