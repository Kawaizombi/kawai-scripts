export interface User {
  username: string;
}

export interface Track {
  description: string;
  title: string;
  artwork_url: string;
  genre: string;
  id: number;
  kind: 'track';
  user: User;
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
