import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsPopupComponent } from '../options-popup/options-popup.component';

@Component({
  selector: 'youtube-blocker',
  templateUrl: './app.template.html',
})
export class AppComponent {
  constructor(private bottomSheet: MatBottomSheet) {}

  openOptionsPopup() {
    this.bottomSheet.open(OptionsPopupComponent);
  }
}
