import { Entry } from '../../@types/Entry';

export default function extractIds(entry: Entry) {
  if(entry.kind === 'playlist') {
    return entry.tracks.map(({ id }) => id);
  }

  return [entry.id];
}
