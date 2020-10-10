import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { TrackMetadata } from './@types';
import { forkJoin, from } from 'rxjs';
import combineBuffers from '../utils/combine-buffers';
import { Entry } from './@types/Entry';
import buildPlaylistManifest from '../utils/build-playlist-manifest';
import { chunk } from '../utils/chunk';

const API_URL = 'https://api-v2.soundcloud.com';
const RESOLVE_URL = `${ API_URL }/resolve`;
const TRACKS_URL = `${ API_URL }/tracks`;
const TRACK_METADATA_CHUNK_SIZE = 50;

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
    const chunks = chunk(ids, TRACK_METADATA_CHUNK_SIZE);

    return from(chunks).pipe(
      mergeMap(
        part => this.http.get<TrackMetadata[]>(TRACKS_URL, { params: { ids: part.join(',') } }),
        2,
      ),
      toArray(),
      map((results) => results.reduce((acc, part) => [...acc, ...part], [])),
    );
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
        urls => this.downloadFiles(urls).pipe(map(combineBuffers)),
        3,
      ),
      toArray(),
    );
  }

  downloadFiles(urls: string[]) {
    return forkJoin(urls.map((url) => {
      return this.http.get(url, { responseType: 'arraybuffer' });
    }));
  }
}
