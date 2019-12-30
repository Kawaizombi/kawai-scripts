import { Injectable } from '@angular/core';
import {
  BANNED_VIDEO_CLASS,
  VIDEO_ITEM_SELECTOR,
  BANNED_VIDEO_SELECTOR,
  CHANNEL_NAME_SELECTOR,
} from './blocker.constants';

@Injectable()
export class BlockerService {
  applyBlock(blockList: string[], context: HTMLElement = document.body) {
    Array.from(context.querySelectorAll(VIDEO_ITEM_SELECTOR))
      .map((node) => node.querySelector(CHANNEL_NAME_SELECTOR))
      .filter(Boolean)
      .filter(({ textContent }) => blockList.find((item) => item.toLowerCase() === textContent.trim().toLowerCase()))
      .map((node) => node.closest(VIDEO_ITEM_SELECTOR))
      .forEach((node) => node.classList.add(BANNED_VIDEO_CLASS));
  }

  suspendBlock() {
    Array.from(document.querySelectorAll(BANNED_VIDEO_SELECTOR))
      .forEach((node) => node.classList.remove(BANNED_VIDEO_CLASS));
  }
}
