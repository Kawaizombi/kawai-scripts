import { Injectable } from '@angular/core';
import { ShortcutHandler } from '../shortcut.service';
import { Store } from '@ngxs/store';
import { PlayerService } from '../../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class QualityShortcutService implements ShortcutHandler {
  constructor(
    private store: Store,
    private playerService: PlayerService,
  ) {
  }

  handle(shortcut) {
    const { QUALITY_UP, QUALITY_DOWN } = this.store.selectSnapshot(({ shortcuts }) => shortcuts);
    const qualityLevels = this.playerService.getAvailableQualityLevels();
    const currentQuality = this.playerService.getQuality();
    const index = qualityLevels.indexOf(currentQuality);
    const next = qualityLevels[index - 1];
    const prev = qualityLevels[index + 1];

    if(QUALITY_UP === shortcut && next) {
      this.playerService.setQuality(next);
    } else if(QUALITY_DOWN === shortcut && prev) {
      this.playerService.setQuality(prev);
    }

  }
}
