export interface User {
  username: string;
}
export type Policies = 'ALLOW' | 'BLOCK' | 'SNIP';

export interface Track {
  description: string;
  title: string;
  artwork_url: string;
  genre: string;
  id: number;
  kind: 'track';
  user: User;
  policy: Policies;
}

export interface Playlist {
  genre: string;
  description: string;
  tracks: Track[];
  id: number;
  kind: 'playlist';
  title: string;
  artwork_url: string;
  user: User;
}

export type Entry = Playlist | Track;
