import axios from 'axios';
import { RESOLVE_URL, TRACKS_URL } from './urls';

export const resolveTrackId = async (url) => {
  const { data: { id } } = await axios(RESOLVE_URL, {
    params: { url },
  });

  return id;
};

export const getTracksMetadata = async (id) => {
  const { data } = await axios(TRACKS_URL, {
    params: { ids: id },
  });

  return data;
};

export const getPlaylistUrl = async (mediaUrl) => {
  const { data: { url } } = await axios(mediaUrl);

  return url;
};

export const getPlaylist = async (url) => {
  const { data } = await axios(url);

  return data;
};

export const downloadSegment = async (url): Promise<ArrayBuffer> => {
  const { data } = await axios(url, { responseType: 'arraybuffer' });

  return data;
};
