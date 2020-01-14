import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { delay, map, mergeAll, retry } from 'rxjs/operators';
import { ALBUM_NAME_SELECTOR, TRACK_LIST_SELECTOR } from './constants';

@Injectable()
export class Downloader {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getTrackList() {
    const rows = Array.from(document.querySelectorAll(TRACK_LIST_SELECTOR));
    const digits = rows.length.toString().length;

    return rows.map((el, i) => {
      const title = el.querySelector(':nth-child(2)').textContent;
      const url = el.querySelector('a[href^=http]').getAttribute('href');
      const [ext] = url.split('.').reverse();

      return { name: `${ title }.${ ext }`, url };
    });
  }

  getAlbumName() {
    return document.querySelector(ALBUM_NAME_SELECTOR).textContent;
  }

  download() {
    return from(this.getTrackList())
      .pipe(
        delay(500),
        map(({ url, name }) =>
          this.http.get(url, { responseType: 'arraybuffer' }).pipe(
            retry(3),
            map((file) => ({ file, name, url })),
          ),
        ),
        mergeAll(4),
      );
  }
}
