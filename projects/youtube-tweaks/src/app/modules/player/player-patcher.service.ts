import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import autobind from 'autobind-decorator';
import { Select } from '@ngxs/store';
import { PreferencesModel, PreferencesState } from '../store/preferences/preferences.state';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
  }

  detach() {
  }

  @autobind
  handle(event: string) {
    if(event === 'dataloaded') {
      this.preferences$
        .pipe(first())
        .subscribe(({ defaultQuality, defaultSpeed }) => {
          this.playerService.setQuality(defaultQuality);
          this.playerService.setSpeed(defaultSpeed);
        });
    }
  }
}
