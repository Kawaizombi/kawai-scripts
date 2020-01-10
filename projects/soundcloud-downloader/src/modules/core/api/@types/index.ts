export interface User {
  id: number;
  kind: string;
  permalink: string;
  username: string;
  last_modified: string;
  uri: string;
  permalink_url: string;
  avatar_url: string;
}

export interface Format {
  protocol: string;
  mime_type: string;
}

export interface Transcoding {
  url: string;
  preset: string;
  duration: number;
  snipped: boolean;
  format: Format;
  quality: string;
}

export interface Media {
  transcodings: Transcoding[];
}

export interface PublisherMetadata {
  urn: string;
  contains_music: boolean;
  artist: string;
  isrc: string;
  id: number;
}

export interface User {
  avatar_url: string;
  first_name: string;
  full_name: string;
  id: number;
  kind: string;
  last_modified: string;
  last_name: string;
  permalink: string;
  permalink_url: string;
  uri: string;
  urn: string;
  username: string;
  verified: boolean;
  city: string;
  country_code?: any;
}

export interface TrackMetadata {
  comment_count: number;
  full_duration: number;
  downloadable: boolean;
  created_at: Date;
  description: string;
  media: Media;
  title: string;
  publisher_metadata: PublisherMetadata;
  duration: number;
  has_downloads_left: boolean;
  artwork_url: string;
  public: boolean;
  streamable: boolean;
  tag_list: string;
  download_url?: any;
  genre: string;
  id: number;
  reposts_count: number;
  state: string;
  label_name?: any;
  last_modified: Date;
  commentable: boolean;
  policy: string;
  visuals?: any;
  kind: string;
  purchase_url?: any;
  sharing: string;
  uri: string;
  secret_token?: any;
  download_count: number;
  likes_count: number;
  urn: string;
  license: string;
  purchase_title?: any;
  display_date: Date;
  embeddable_by: string;
  release_date?: any;
  user_id: number;
  monetization_model: string;
  waveform_url: string;
  permalink: string;
  permalink_url: string;
  user: User;
  playback_count: number;
}

export interface ResolveMetadata {
  comment_count: number;
  downloadable: boolean;
  release?: any;
  created_at: string;
  description: string;
  original_content_size: number;
  title: string;
  track_type?: any;
  duration: number;
  video_url?: any;
  original_format: string;
  artwork_url: string;
  streamable: boolean;
  tag_list: string;
  release_month?: any;
  genre: string;
  release_day?: any;
  download_url: string;
  id: number;
  state: string;
  reposts_count: number;
  last_modified: string;
  label_name?: any;
  commentable: boolean;
  bpm?: any;
  policy: string;
  favoritings_count: number;
  kind: string;
  purchase_url?: any;
  release_year?: any;
  key_signature?: any;
  isrc: string;
  sharing: string;
  uri: string;
  download_count: number;
  license: string;
  purchase_title?: any;
  user_id: number;
  embeddable_by: string;
  monetization_model: string;
  waveform_url: string;
  permalink: string;
  permalink_url: string;
  user: User;
  label_id?: any;
  stream_url: string;
  playback_count: number;
  tracks: ResolveMetadata[];
}
