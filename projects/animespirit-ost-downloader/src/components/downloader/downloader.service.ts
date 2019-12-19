import { Injectable } from '@angular/core';
import { ALBUM_NAME_SELECTOR, TRACK_LIST_SELECTOR } from './constants';
import PQueue from 'p-queue';
import { filter, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class Downloader {
  private readonly queue = new PQueue({
    concurrency: 4,
  });

  constructor(
    private readonly http: HttpClient,
  ) {
    console.log(http);
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
    this.http.get(trackList[0].url, {responseType: 'arraybuffer', observe: "events"})
      .pipe(
        tap((event: HttpEvent<any>) => console.log(event instanceof HttpResponse)),
        filter((event: HttpEvent<any>) => event instanceof HttpResponse)
      )
      .subscribe(console.log);

    /*from(trackList)
      .pipe(
        mergeMap((url) => {}),
      );*/
  }
}
