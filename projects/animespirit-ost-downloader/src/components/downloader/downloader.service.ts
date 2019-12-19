import { Injectable } from '@angular/core';
import { ALBUM_NAME_SELECTOR, TRACK_LIST_SELECTOR } from './constants';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll } from "rxjs/operators";
import { from } from "rxjs";

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
      const num = (i + 1).toString().padStart(digits, '0');
      const [ext] = url.split('.').reverse();

      return {name: `${num} ${title}.${ext}`, url};
    });
  }

  getAlbumName() {
    return document.querySelector(ALBUM_NAME_SELECTOR).textContent;
  }

  download() {
    return from(this.getTrackList())
      .pipe(
        map(({url, name}) =>
          this.http.get(url, {responseType: 'arraybuffer'})
            .pipe(map((file) => ({file, name, url})))
        ),
        mergeAll(4),
      );
  }
}
