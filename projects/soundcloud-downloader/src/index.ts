import './polyfills';
import './styles/main.scss';
import axios from 'axios';
import sniffer from './utils/http-sniffer';
import combineBuffers from './utils/combine-buffers';
import { filter, map } from 'rxjs/operators';
import { BUTTON_TOOLBAR_SELECTOR } from './constants';
import ID3Writer from 'browser-id3-writer';
import { getTracksMetadata, getPlaylist, getPlaylistUrl, resolveTrackId, downloadSegment } from './api';
import getUrlsFromPlaylist from './utils/get-urls-from-playlist';
import saveFile from '@kawai-scripts/save-file';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app/app.module';
import { enableProdMode } from '@angular/core';

let clientId;

axios.interceptors.request.use((config) => {
  const url = new URL(config.url);
  const isApiCall = url.host.indexOf('soundcloud.com') > -1;

  if(isApiCall) {
    return { ...config, params: { ...config.params, client_id: clientId } };
  }

  return config;
});

sniffer()
  .pipe(
    map(([, url]) => url),
    map((url) => new URLSearchParams(url).get('client_id')),
    filter(Boolean),
  )
  .subscribe((id) => {
    clientId = id;
  });

function changeArtworkSize(url: string, size: number) {
  return url.replace(/(large)(\..+)$/, `t${ size }x${ size }$2`);
}

function init() {
  const button = document.createElement('button');
  button.innerText = 'Download';
  button.addEventListener('click', async () => {
    const trackId = await resolveTrackId(document.location.href);
    const metadata = await getTracksMetadata(trackId);
    const playlistUrl = await getPlaylistUrl(metadata[0].media.transcodings[0].url);
    const playlist = await getPlaylist(playlistUrl);
    const { data: artwork } = await axios(changeArtworkSize(metadata[0].artwork_url, 500), { responseType: 'arraybuffer' });
    const segmentUrls = getUrlsFromPlaylist(playlist);


    Promise.all(segmentUrls.map(downloadSegment))
      .then((buffers) => combineBuffers(buffers))
      .then((buffer) =>
        new ID3Writer(buffer)
          .setFrame('TCON', metadata[0].genre.split(' & '))
          .setFrame('TIT2', metadata[0].title)
          .setFrame('TPE1', [metadata[0].user.username])
          .setFrame('APIC', {
            type: 18,
            data: artwork,
            description: 'Artwork',
          })
          .addTag()
      )
      .then((buffer) => new Blob([buffer], { type: 'audio/mp3' }))
      .then((output) => saveFile(output, `${ metadata[0].title }.mp3`));
  });

  setTimeout(() => {
    document.querySelector(BUTTON_TOOLBAR_SELECTOR).append(button);
  }, 1000);
}

init();
if(process.env.NODE_ENV === 'production') enableProdMode();
const appElement = document.createElement('downloader-app');
document.querySelector('header .header__right').append(appElement);
platformBrowserDynamic().bootstrapModule(AppModule);
