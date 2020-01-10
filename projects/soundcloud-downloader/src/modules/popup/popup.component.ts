import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from '../core/api/api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import combineBuffers from '../../utils/combine-buffers';
import saveFile from '@kawai-scripts/save-file';
import ID3Writer from 'browser-id3-writer';

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
    let metadata;

    this.api
      .resolveTrackByUrl(document.location.href)
      .pipe(
        switchMap(({ id }) => this.api.getTracksMetadata(id)),
        tap(([meta]) => {
          metadata = meta;
        }),
        map(([{ media }]) => media.transcodings[0].url),
        switchMap((url) => this.api.getPlaylistUrl(url)),
        switchMap((url) => this.api.getPlaylist(url)),
        map((manifest) => manifest.segments.map(({ uri }) => uri)),
        switchMap((urls: string[]) => forkJoin(urls.map((url) => this.api.downloadFile(url)))),
        map(combineBuffers),
        switchMap((buffer) => this.api
          .downloadFile(metadata.artwork_url.replace(/(large)(\..+)$/, `t500x500$2`))
          .pipe(
            map((artwork) => {
              return new ID3Writer(buffer)
                .setFrame('TCON', metadata.genre.split(' & '))
                .setFrame('TIT2', metadata.title)
                .setFrame('TPE1', [metadata.user.username])
                .setFrame('APIC', {
                  type: 18,
                  data: artwork,
                  description: 'Artwork',
                })
                .addTag() as ArrayBuffer;
            }),
          ),
        ),
      )
      .subscribe((buffer) => {
        saveFile(new Blob([buffer]), `${metadata.title}.mp3`);
      });
  }
}
