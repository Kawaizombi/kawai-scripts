export interface Base {
  title: string;
  readySegments: number;
  totalSegments: number;
}

export interface DownloadItem extends Base {
  status: 'pending' | 'in-progress' | 'ready';
  kind: 'track' | 'playlist';
  tracks: Base[];
}
