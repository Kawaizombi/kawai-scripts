import { Injectable } from '@angular/core';
import { ALBUM_NAME_SELECTOR, TRACK_LIST_SELECTOR } from './constants';
import PQueue from 'p-queue';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Downloader {
  private readonly queue = new PQueue({
    concurrency: 4,
  });

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

      return { name: `${ num } ${ title }.${ ext }`, url };
    });
  }

  getAlbumName() {
    return document.querySelector(ALBUM_NAME_SELECTOR).textContent;
  }

  async download() {
    const trackList = this.getTrackList();
    console.log(this.http);
    this.http.get(trackList[0].url, { responseType: 'arraybuffer' }).subscribe(() => console.log(1111))

    /*from(trackList)
      .pipe(
        mergeMap((url) => {}),
      );*/
  }
}
