import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Store } from '@ngxs/store';
import { TrackMetadata } from '../api/@types';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import extractIds from '../utils/extract-ids';
import extractMediaUrls from '../utils/extract-media-urls';
import extractUrlsFromManifest from '../utils/extract-urls-from-manifest';
import archive from '@kawai-scripts/archive';
import addId3 from '../utils/add-id3';
import { forkJoin, from, of } from 'rxjs';
import saveFile from '@kawai-scripts/save-file';
import { AddDownloadItem, RemoveDownloadItem } from '../../store/downloads/downloads.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { chunk } from '../utils/chunk';

const TRACK_METADATA_CHUNK_SIZE = 25;

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

  private addId3(buffers: ArrayBuffer[], metadata: TrackMetadata[], rootMetadata) {
    const sources = buffers.map((buffer, index) => {
      const trackNumber = buffers.length > 1
        ? rootMetadata.tracks.findIndex(item => item.id === metadata[index].id) + 1
        : undefined;
      const albumTitle = rootMetadata.is_album ? rootMetadata.title : undefined;
      const meta = metadata[index];

      if (meta.artwork_url) {
        const artworkUrl = meta.artwork_url.replace('large', `t500x500`);

        return this.api
          .downloadFiles([artworkUrl])
          .pipe(
            map(([artwork]) => addId3(buffer, { ...meta, artwork, trackNumber, albumTitle })),
          );
      } else {
        return of(addId3(buffer, { ...meta, trackNumber, albumTitle }));
      }
    });

    return forkJoin(sources);
  }

  download(rootUrl: string, addTrackNumber: boolean) {
    this.store.dispatch(new AddDownloadItem(rootUrl));
    let rootMetadata;
    let metadata: TrackMetadata[] = [];

    this.api
      .resolveByUrl(rootUrl)
      .pipe(
        tap((entry) => (rootMetadata = entry)),
        map(extractIds),
        switchMap(ids => from(chunk(ids, TRACK_METADATA_CHUNK_SIZE))),
        mergeMap(
          (ids, index) => this.api.getTracksMetadata(ids)
            .pipe(
              tap(meta => (metadata = metadata.concat(meta))),
              map(extractMediaUrls),
              switchMap(urls => this.api.getPlaylistUrls(urls)),
              switchMap(urls => this.api.getPlaylists(urls)),
              map(extractUrlsFromManifest),
              switchMap(files => this.api.downloadSegments(files)),
              map(value => ({ value, index })),
            ),
          1,
        ),
        toArray(),
        map(pairs => pairs.sort((l, r) => l.index - r.index).map(pair => pair.value)),
        map(b => b.reduce((acc, buffers) => [...acc, ...buffers], [])),
        switchMap((buffers: ArrayBuffer[]) => this.addId3(buffers, metadata, rootMetadata)),
        switchMap((buffers: ArrayBuffer[]) => {
          if (buffers.length > 1) {
            const files = buffers.map((file, index) => {
              const i = rootMetadata.tracks.findIndex(item => item.id === metadata[index].id);
              const prefix = addTrackNumber
                ? `${ (i + 1).toString().padStart(buffers.length.toString().length, '0') }.`
                : '';

              return ({
                file,
                name: `${ prefix } ${ metadata[index].title }.mp3`.trim(),
              });
            });
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
