import { Parser } from 'm3u8-parser';

export default function buildPlaylistManifest(playlist) {
  const parser = new Parser();
  parser.push(playlist);
  parser.end();

  return parser.manifest;
}
