import { Parser } from 'm3u8-parser';

export default function getUrlsFromPlaylist(playlist: string): string[] {
  const parser = new Parser();
  parser.push(playlist);
  parser.end();

  return parser.manifest.segments.map(({ uri }) => uri);
}
