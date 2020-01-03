import combineCssSelectors from '../../utils/combine-css-rules';

export const BANNED_VIDEO_CLASS = 'banned-video';
export const BANNED_VIDEO_SELECTOR = `.${ BANNED_VIDEO_CLASS }`;

export const WHITE_LISTED_CHANNELS = ['YouTube'];

export const VIDEO_ITEM_SELECTOR = combineCssSelectors(
  '.video-list-item',
  '.yt-shelf-grid-item',
  '.yt-lockup-video:not(.yt-lockup-grid)',
  '.yt-lockup-playlist:not(.yt-lockup-grid)',
  'ytd-rich-item-renderer',
  'ytd-compact-video-renderer',
  'ytd-video-renderer',
);

export const CHANNEL_NAME_SELECTOR = combineCssSelectors(
  '.stat.attribution',
  '.yt-uix-sessionlink[href^="/channel"]',
  '.yt-uix-sessionlink[href^="/user"]',
  '.yt-lockup-byline [href^="/channel"]',
  '.yt-lockup-byline [href^="/user"]',
  'yt-formatted-string [href^="/channel"]',
  'yt-formatted-string [href^="/user"]',
  'ytd-channel-name yt-formatted-string.ytd-channel-name',
);
