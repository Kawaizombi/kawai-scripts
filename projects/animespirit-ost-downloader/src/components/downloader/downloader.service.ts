import { Injectable } from "@angular/core";
import { ALBUM_NAME_SELECTOR, TRACK_LIST_SELECTOR } from "./constants";
import PQueue from "p-queue";

@Injectable()
class Downloader {
  private readonly queue = new PQueue({
    concurrency: 4,
  });

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
}
