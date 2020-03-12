import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Store } from '@ngxs/store';
import { TrackMetadata } from '../api/@types';
import { map, switchMap, tap } from 'rxjs/operators';
import extractIds from '../utils/extract-ids';
import extractMediaUrls from '../utils/extract-media-urls';
import extractUrlsFromManifest from '../utils/extract-urls-from-manifest';
import archive from '@kawai-scripts/archive';
import addId3 from '../utils/add-id3';
import { forkJoin } from 'rxjs';
import saveFile from '@kawai-scripts/save-file';
import { AddDownloadItem, RemoveDownloadItem } from '../../store/downloads/downloads.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DownloaderService {
  constructor(
    private api: ApiService,
    private store: Store,
    private snackBar: MatSnackBar,
  ) {
  }

  private addId3(buffers: ArrayBuffer[], metadata: TrackMetadata[]) {
    const sources = buffers.map((buffer, index) => {
      const meta = metadata[index];
      const artworkUrl = meta.artwork_url.replace('large', `t500x500`);

      return this.api
        .downloadFiles([artworkUrl])
        .pipe(map(([artwork]) => {
          return addId3(buffer, { ...meta, artwork });
        }));
    });

    return forkJoin(sources);
  }

  download(rootUrl: string) {
    this.store.dispatch(new AddDownloadItem(rootUrl));
    let rootMetadata;
    let metadata: TrackMetadata[];

    this.api
      .resolveByUrl(rootUrl)
      .pipe(
        tap((entry) => (rootMetadata = entry)),
        map(extractIds),
        switchMap((ids) => this.api.getTracksMetadata(ids)),
        tap((meta) => (metadata = meta)),
        map(extractMediaUrls),
        switchMap((urls) => this.api.getPlaylistUrls(urls)),
        switchMap((urls) => this.api.getPlaylists(urls)),
        map(extractUrlsFromManifest),
        switchMap((files) => this.api.downloadSegments(files)),
        switchMap((buffers: ArrayBuffer[]) => this.addId3(buffers, metadata)),
        switchMap((buffers: ArrayBuffer[]) => {
          if(buffers.length > 1) {
            const files = buffers.map((file, index) => ({
              file,
              name: `${ metadata[index].title }.mp3`,
            }));
            return archive(files);
          }
          return Promise.resolve(new Blob([buffers[0]]));
        }),
      )
      .subscribe((blob: Blob) => {
        const multi = metadata.length > 1;
        const ext = multi ? 'zip' : 'mp3';
        const name = `${ rootMetadata.title }.${ ext }`;

        saveFile(blob, name);
        this.store.dispatch(new RemoveDownloadItem(rootUrl));
      }, (err) => {
        console.error('[ERROR](soundcloud-downloader)', err);

        this.snackBar.open('Error has occurred try again later', null, {
          duration: 3500,
        });

        this.store.dispatch(new RemoveDownloadItem(rootUrl));
      });
  }
}
