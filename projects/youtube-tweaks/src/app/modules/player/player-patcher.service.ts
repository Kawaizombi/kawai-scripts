import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import autobind from 'autobind-decorator';
import { Select } from '@ngxs/store';
import { PreferencesModel, PreferencesState } from '../store/preferences/preferences.state';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

// yt-navigate-finish - new youtube, spfdone - old youtube
const NAVIGATE_EVENT = document.querySelector('ytd-app') ? 'yt-navigate-finish' : 'spfdone';

@Injectable({
  providedIn: 'root',
})
export class PlayerPatcherService {
  @Select(PreferencesState) preferences$: Observable<PreferencesModel>;

  constructor(
    private playerService: PlayerService,
  ) {
  }

  attach() {
    window.addEventListener(NAVIGATE_EVENT, this.handle);
  }

  detach() {
    window.removeEventListener(NAVIGATE_EVENT, this.handle);
  }

  @autobind
  handle() {
    this.preferences$
      .pipe(first())
      .subscribe(({ defaultQuality, defaultSpeed, autoStart }) => {
        this.playerService.setQuality(defaultQuality);
        this.playerService.setSpeed(defaultSpeed);
        if (!autoStart) this.playerService.stop();
      });
  }
}
