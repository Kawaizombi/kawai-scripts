import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsPopupComponent } from '../options-popup/options-popup.component';
import { BlockerService } from '../blocker/blocker.service';

@Component({
  selector: 'youtube-blocker',
  templateUrl: './app.template.html',
})
export class AppComponent {
  constructor(
    private bottomSheet: MatBottomSheet,
    private blocker: BlockerService,
  ) {
    this.blocker.addBlockButtons();
  }

  openOptionsPopup() {
    this.bottomSheet.open(OptionsPopupComponent);
  }
}
