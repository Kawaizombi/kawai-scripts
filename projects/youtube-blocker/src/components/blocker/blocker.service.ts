import { Injectable } from '@angular/core';
import minimatch, { IOptions } from 'minimatch';
import { getVideoElements } from './blocker.utils';
import {
  BANNED_VIDEO_CLASS,
  VIDEO_ITEM_SELECTOR,
  BANNED_VIDEO_SELECTOR,
  CHANNEL_NAME_SELECTOR,
} from './blocker.constants';

const MINIMATCH_OPTIONS: IOptions = {
  dot: false,
  noext: true,
  noglobstar: true,
  nocase: true,
};

const isInBlockList = function (item: string, blockList: string[]) {
  return blockList.find((rule) => minimatch(item, rule, MINIMATCH_OPTIONS));
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
