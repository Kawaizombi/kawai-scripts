import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Parser } from 'm3u8-parser';
import { ResolveMetadata, TrackMetadata } from './@types';

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

  resolveTrackByUrl(url: string) {
    return this.http.get<ResolveMetadata>(RESOLVE_URL, { params: { url } });
  }

  getTracksMetadata(...ids: number[]) {
    return this.http.get<TrackMetadata[]>(TRACKS_URL, { params: { ids: ids.join(',') } });
  }

  getPlaylistUrl(mediaUrl: string) {
    return this.http
      .get<{ url: string }>(mediaUrl)
      .pipe(map(({ url }) => url));
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

  downloadFile(url: string) {
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
}
