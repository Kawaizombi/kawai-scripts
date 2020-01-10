import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Parser } from 'm3u8-parser';
import { TrackMetadata } from './@types';
import { forkJoin } from 'rxjs';
import combineBuffers from '../../../utils/combine-buffers';
import { Entry } from './@types/Entry';

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

  getPlaylistUrls(mediaUrls: string[]) {
    return forkJoin(mediaUrls.map((url) => this.getPlaylistUrl(url)));
  }

  getPlaylistUrl(mediaUrl: string) {
    return this.http
      .get<{ url: string }>(mediaUrl)
      .pipe(map(({ url }) => url));
  }

  getPlaylists(urls: string[]) {
    return forkJoin(urls.map((url) => this.getPlaylist(url)));
  }

  getPlaylist(url: string) {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map((str) => {
          const parser = new Parser();
          parser.push(str);
          parser.end();

          return parser.manifest;
        }),
      );
  }

  downloadSegments(files: string[][]) {
    return forkJoin(files.map((urls) => this.downloadFiles(urls).pipe(map(combineBuffers))));
  }

  downloadFiles(urls: string[]) {
    return forkJoin(urls.map((url) => this.downloadFile(url)));
  }

  downloadFile(url: string) {
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
}
