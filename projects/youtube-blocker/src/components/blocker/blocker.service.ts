import { Injectable } from '@angular/core';
import { getVideoElements } from './blocker.utils';
import {
  BANNED_VIDEO_CLASS,
  VIDEO_ITEM_SELECTOR,
  BANNED_VIDEO_SELECTOR,
  CHANNEL_NAME_SELECTOR,
} from './blocker.constants';

export const isInBlockList = function (item: string, blockList: string[]) {
  return blockList.find((rule) => {
    if(rule.includes('*')) {
      return RegExp(`^${ rule.replace(/\*/g, '.+') }$`, 'i').test(item);
    }

    return item.toLowerCase() === rule.toLowerCase();
  });
};

@Injectable()
export class BlockerService {
  applyBlock(blockList: string[], context: HTMLElement = document.body) {
    getVideoElements(context)
      .map((node) => node.querySelector(CHANNEL_NAME_SELECTOR))
      .filter(Boolean)
      .filter(({ textContent }: HTMLElement) => isInBlockList(textContent, blockList))
      .map((node) => node.closest(VIDEO_ITEM_SELECTOR))
      .forEach((node) => node.classList.add(BANNED_VIDEO_CLASS));
  }

  suspendBlock() {
    Array.from(document.querySelectorAll(BANNED_VIDEO_SELECTOR))
      .forEach((node) => node.classList.remove(BANNED_VIDEO_CLASS));
  }
}
