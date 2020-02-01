import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from './modules/preferences-popup/preferences-popup.component';
import { ShortcutService } from './modules/shortcut/shortcut.service';
import { PlayerPatcherService } from './modules/player/player-patcher.service';
import { Select } from '@ngxs/store';
import { PreferencesModel, PreferencesState } from './modules/store/preferences/preferences.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'yt-tweaks-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  @Select(PreferencesState) preferences$: Observable<PreferencesModel>;

  constructor(
    private dialog: MatDialog,
    private shortcutService: ShortcutService,
    private playerPatcherService: PlayerPatcherService,
  ) {
  }

  ngOnInit() {
    this.playerPatcherService.attach();

    this.preferences$
      .pipe(map(({shortcutsEnabled}) => shortcutsEnabled))
      .subscribe((enabled) => {
        enabled ? this.shortcutService.attach() : this.shortcutService.detach();
      });
  }

  openOptionsPopup(event: MouseEvent) {
    event.stopPropagation();

    this.dialog.open(PreferencesPopupComponent, {
      minWidth: 640,
      panelClass: 'dialog-popup',
    });
  }
}
