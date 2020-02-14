interface VideoMeta {
  video_id: string | undefined;
  author: string;
  title: string;
}

export interface Player extends HTMLDivElement {
  stopVideo(): void;
  getVideoData(): VideoMeta;
}
