import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
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

  private downloadProgressive(url: string) {
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  private downloadFormChunks(urls: string[]) {
    return this.downloadFiles(urls).pipe(map(combineBuffers));
  }

  private downloadHsl(url: string) {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map(buildPlaylistManifest),
        map((manifest) => manifest.segments.map(({ uri }) => uri as string)),
        switchMap((urls) => this.downloadFormChunks(urls)),
      );
  }

  private getTranscodingUrl(url: string) {
    return this.http
      .get<{ url: string }>(url)
      .pipe(map(({ url }) => url));
  }

  private downloadFromPlaylist(source: Transcoding[]) {
    const ofProtocol = (p) => ({ format: { protocol } }) => protocol === p;

    const hsl = source.find(ofProtocol('hsl'));
    const progressive = source.find(ofProtocol('progressive'));

    if(progressive) {
      return this.getTranscodingUrl(progressive.url)
        .pipe(
          switchMap((url) => this.downloadProgressive(url)),
        );
    }

    return this.getTranscodingUrl(hsl.url)
      .pipe(
        switchMap((url) => this.downloadHsl(url)),
      );
  }

  getTrackFromPlaylist(items: Transcoding[][]) {
    return forkJoin(items.map((t) => this.downloadFromPlaylist(t)));
  }

  getPlaylistUrls(urls: string[]) {
    return forkJoin(urls.map((url) => {
      return this.http
        .get<{ url: string }>(url)
        .pipe(map(({ url }) => url));
    }));
  }

  getPlaylists(urls: string[]) {
    return forkJoin(urls.map((url) => {
      return this.http
        .get(url, { responseType: 'text' })
        .pipe(map(buildPlaylistManifest));
    }));
  }

  downloadSegments(files: string[][]) {
    return forkJoin(files.map((urls) => {
      return this.downloadFiles(urls)
        .pipe(map(combineBuffers));
    }));
  }

  downloadFiles(urls: string[]) {
    return forkJoin(urls.map((url) => {
      return this.http.get(url, { responseType: 'arraybuffer' });
    }));
  }
}
