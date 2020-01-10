import { TrackMetadata } from '../../@types';

export default function extractMediaUrls(tracks: TrackMetadata[]) {
  return tracks.map((metadata) => metadata.media.transcodings[0].url);
}
