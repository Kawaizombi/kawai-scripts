import axios from 'axios';
import sniffer from './utils/http-sniffer';
import { filter, map } from 'rxjs/operators';
import { BUTTON_TOOLBAR_SELECTOR } from './constants';
import { Parser } from 'm3u8-parser';
import ID3Writer from 'browser-id3-writer';
import { getTracksMetadata, getPlaylist, getPlaylistUrl, resolveTrackId, downloadSegment } from './api';
import saveFile from '@kawai-scripts/save-file';

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

function combineBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  let offset = 0;
  const size = buffers.reduce((sum, { byteLength }) => sum + byteLength, 0);

  return buffers.reduce((result: Uint8Array, buffer: ArrayBuffer) => {
    result.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;

    return result
  }, new Uint8Array(size));
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
    const parser = new Parser();
    parser.push(playlist);
    parser.end();


    Promise.all(
      parser.manifest.segments.map(({ uri }) => downloadSegment(uri)) as Promise<ArrayBuffer>[]
    )
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
  }, 1000)

}

init();
