import { VIDEO_ITEM_SELECTOR } from './blocker.constants';

export function getVideoElements(context: HTMLElement) {
  const isVideoElement = context.matches(VIDEO_ITEM_SELECTOR);

  return isVideoElement ? [context] : Array.from(context.querySelectorAll(VIDEO_ITEM_SELECTOR));
}
