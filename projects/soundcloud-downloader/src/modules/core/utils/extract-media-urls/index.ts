import { TrackMetadata } from '../../api/@types';

export default function extractMediaUrls(tracks: TrackMetadata[]) {
  return tracks.map(({ media: { transcodings } }) => {
    const { url } = transcodings.find(({ format: { protocol } }) => protocol === 'hls');

    return url;
  });
}
