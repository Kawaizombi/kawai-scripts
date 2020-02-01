import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from './modules/preferences-popup/preferences-popup.component';
import { ShortcutService } from './modules/shortcut/shortcut.service';
import { PlayerPatcherService } from './modules/player/player-patcher.service';

@Component({
  selector: 'yt-tweaks-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent {
  constructor(
    private dialog: MatDialog,
    private shortcutService: ShortcutService,
    private playerPatcherService: PlayerPatcherService,
  ) {
    playerPatcherService.attach();
  }

  openOptionsPopup(event: MouseEvent) {
    event.stopPropagation();

    this.dialog.open(PreferencesPopupComponent, {
      minWidth: 640,
      panelClass: 'dialog-popup',
    });
  }
}
