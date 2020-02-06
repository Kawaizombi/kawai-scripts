import { TrackMetadata } from '../../api/@types';

export default function extractMediaUrls(tracks: TrackMetadata[]) {
  return tracks.map((metadata) => metadata.media.transcodings);
}
