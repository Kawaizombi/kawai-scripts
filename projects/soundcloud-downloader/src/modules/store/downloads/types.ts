export interface Base {
  id: number;
  title: string;
  readySegments: number;
  totalSegments: number;
}

export interface Track extends Base {
  playlistUrl: string;
}

export interface DownloadItem extends Base {
  status: 'pending' | 'in-progress' | 'ready';
  kind: 'track' | 'playlist';
  tracks: Track[];
}
