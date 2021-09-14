import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { TrackMetadata } from './@types';
import { forkJoin, from } from 'rxjs';
import combineBuffers from '../utils/combine-buffers';
import { Entry } from './@types/Entry';
import buildPlaylistManifest from '../utils/build-playlist-manifest';

const API_URL = 'https://api-v2.soundcloud.com';
const RESOLVE_URL = `${ API_URL }/resolve`;
const TRACKS_URL = `${ API_URL }/tracks`;

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
    return from(files).pipe(
      mergeMap(
        (urls, index) => this.downloadFiles(urls).pipe(
          map((buffers) => ({ value: combineBuffers(buffers), index })),
        ),
        3,
      ),
      toArray(),
      map(pairs => pairs.sort((l, r) => l.index - r.index).map(pair => pair.value)),
    );
  }

  downloadFiles(urls: string[]) {
    return forkJoin(urls.map((url) => {
      return this.http.get(url, { responseType: 'arraybuffer' });
    }));
  }
}
