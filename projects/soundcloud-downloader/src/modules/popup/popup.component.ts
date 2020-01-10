import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from '../core/api/api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import saveFile from '@kawai-scripts/save-file';
import ID3Writer from 'browser-id3-writer';
import extractIds from '../core/api/utils/extract-ids';
import { TrackMetadata } from '../core/api/@types';
import extractMediaUrls from '../core/api/utils/extract-media-urls';
import extractUrlsFromManifest from '../core/api/utils/extract-urls-from-manifest';
import archive from '@kawai-scripts/archive';

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
    let metadata: TrackMetadata[];
    let root;

    this.api
      .resolveByUrl(document.location.href)
      .pipe(
        tap((entry) => (root = entry)),
        map(extractIds),
        switchMap((ids) => this.api.getTracksMetadata(ids)),
        tap((meta) => (metadata = meta)),
        map(extractMediaUrls),
        switchMap((urls) => this.api.getPlaylistUrls(urls)),
        switchMap((urls) => this.api.getPlaylists(urls)),
        map(extractUrlsFromManifest),
        switchMap((files) => this.api.downloadSegments(files)),
        map((buffers: ArrayBuffer[]) => {
          return buffers.map((buffer, index) => {
            return new ID3Writer(buffer)
              .setFrame('TCON', metadata[index].genre.split(' & '))
              .setFrame('TIT2', metadata[index].title)
              .setFrame('TPE1', [metadata[index].user.username])
              .addTag() as ArrayBuffer;
          });
        }),
        switchMap((buffers: ArrayBuffer[]) => {
          if(buffers.length > 1) {
            return archive(buffers.map((file, index) => ({
              file,
              name: `${metadata[index].title}.mp3`,
            })));
          }
          return Promise.resolve(new Blob([buffers[0]]));
        }),
      )
      .subscribe((blob: Blob) => {
        const name = metadata.length > 1 ? `${root.title}.zip` : `${ metadata[0].title }.mp3`;
        saveFile(blob, name);
      });
  }
}
