import { Component } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleDown';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'downloader-app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent {
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor(
    private bottomSheet: MatBottomSheet,
  ) {
  }

  openPopupDownload(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.bottomSheet.open(PopupComponent);
  }
}
