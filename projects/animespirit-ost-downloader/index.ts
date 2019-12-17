import './polyfills';
import axios from 'axios';
import gmAxiosAdapter from '@kawai-scripts/gm-axios-adapter';
import saveFile from '@kawai-scripts/save-file';
import PQueue from 'p-queue';
import archive from '@kawai-scripts/archive';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { App } from "./app";

const instance = axios.create({ adapter: gmAxiosAdapter });
const queue = new PQueue({
  concurrency: 4,
});

function getAlbumName() {
  return document.querySelector('.content-block-title a').textContent;
}

function getTrackList() {
  const rows = Array.from(document.querySelectorAll('.tracklist tbody tr:not(:first-child)'));
  const digits = rows.length.toString().length;

  return rows.map((el, i) => {
    const title = el.querySelector(':nth-child(2)').textContent;
    const url = el.querySelector('a[href^=http]').getAttribute('href');
    const num = (i + 1).toString().padStart(digits, '0');
    const [ext] = url.split('.').reverse();

    return { name: `${ num } ${ title }.${ ext }`, url };
  });
}

function addDownloadButton() {
  const button = document.createElement('button');
  button.textContent = 'Download';

  document.querySelector('.accordion').prepend(button);

  button.addEventListener('click', async () => {
    let ready = 0;
    const trackList = getTrackList();

    button.disabled = true;
    button.textContent = `Downloaded ${ ready } / ${ trackList.length }`;

    const files = await queue.addAll(trackList.map(({ url, name }) => async () => {
      const { data: file }: { data: ArrayBuffer } = await instance({ url, responseType: 'arraybuffer' });

      ready++;
      button.textContent = `Downloaded ${ ready } / ${ trackList.length }`;

      return { name, file };
    }));

    button.textContent = 'Archiving';

    saveFile(await archive(files), `${ getAlbumName() }.zip`);

    button.disabled = false;
    button.textContent = 'Ready';
  });
}

addDownloadButton();

const mountPoint = document.createElement('app');
document.querySelector('.accordion').prepend(mountPoint);

platformBrowserDynamic().bootstrapModule(App);
