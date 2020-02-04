import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DownloaderService } from '../core/downloader/downloader.service';

@Component({
  selector: 'sc-downloader-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  faTimes = faTimes;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PopupComponent>,
    private downloader: DownloaderService,
  ) {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  download() {
    this.downloader.download(document.location.href);
  }
}
