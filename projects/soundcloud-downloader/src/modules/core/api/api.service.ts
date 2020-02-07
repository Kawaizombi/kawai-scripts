import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrackMetadata, Transcoding } from './@types';
import { forkJoin } from 'rxjs';
import combineBuffers from '../utils/combine-buffers';
import { Entry } from './@types/Entry';
import buildPlaylistManifest from '../utils/build-playlist-manifest';

const RESOLVE_URL = 'https://api.soundcloud.com/resolve';
const TRACKS_URL = 'https://api-v2.soundcloud.com/tracks';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  resolveByUrl(url: string) {
    return this.http.get<Entry>(RESOLVE_URL, { params: { url } });
  }

  getTracksMetadata(ids: number[]) {
    return this.http.get<TrackMetadata[]>(TRACKS_URL, { params: { ids: ids.join(',') } });
  }

  private downloadHlsSteam(urls: string[]) {
    return this.downloadFiles(urls).pipe(map(combineBuffers));
  }

  private downloadHls(url: string) {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map((playlist) => {
          const manifest = buildPlaylistManifest(playlist);

          return manifest.segments.map(({ uri }) => uri as string)
        }),
        switchMap((urls) => this.downloadHlsSteam(urls)),
      );
  }

  private getTranscodingUrl(url: string) {
    return this.http
      .get<{ url: string }>(url)
      .pipe(map(({ url }) => url));
  }

  private downloadTranscoding(source: Transcoding[]) {
    const ofProtocol = (p) => ({ format: { protocol } }) => protocol === p;

    const hls = source.find(ofProtocol('hls'));
    const progressive = source.find(ofProtocol('progressive'));

    const hlsDownload$ = this.getTranscodingUrl(hls.url)
      .pipe(
        switchMap((url) => this.downloadHls(url)),
      );

    if(progressive) {
      return this.getTranscodingUrl(progressive.url)
        .pipe(
          switchMap((url) => this.downloadFile(url)),
          catchError(() => hlsDownload$),
        );
    }

    return hlsDownload$;
  }

  downloadMedia(items: Transcoding[][]) {
    return forkJoin(items.map((t) => this.downloadTranscoding(t)));
  }

  downloadFile(url: string) {
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  downloadFiles(urls: string[]) {
    return forkJoin(urls.map((url) => this.downloadFile(url)));
  }
}
