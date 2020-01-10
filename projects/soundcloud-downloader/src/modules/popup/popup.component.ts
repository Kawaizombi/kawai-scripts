import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from '../core/api/api.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import combineBuffers from '../../utils/combine-buffers';
import saveFile from '@kawai-scripts/save-file';

@Component({
  selector: 'downloader-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  faTimes = faTimes;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PopupComponent>,
    private api: ApiService,
  ) {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  download() {
    this.api
      .resolveTrackByUrl(document.location.href)
      .pipe(
        switchMap(({ id }) => this.api.getTracksMetadata(id)),
        map(([{ media }]) => media.transcodings[0].url),
        switchMap((url) => this.api.getPlaylistUrl(url)),
        switchMap((url) => this.api.getPlaylist(url)),
        map((manifest) => manifest.segments.map(({ uri }) => uri)),
        switchMap((urls: string[]) => forkJoin(urls.map((url) => this.api.downloadFile(url)))),
        map(combineBuffers),
      )
      .subscribe((buffer) => {
        saveFile(new Blob([buffer]), 'test.mp3');
      });
  }
}
