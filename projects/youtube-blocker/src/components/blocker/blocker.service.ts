import './blocker.styles.scss';
import { ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import {
  BANNED_VIDEO_CLASS,
  BANNED_VIDEO_SELECTOR,
  CHANEL_NAME_SELECTOR,
  VIDEO_ITEM_SELECTOR
} from './blocker.constants';
import { BlockVideoComponent } from '../block-video/block-video.component';

@Injectable({
  providedIn: 'root'
})
export class BlockerService {
  private blockButtons: ComponentRef<BlockVideoComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
  }

  applyBlock(blockList: string[]) {
    Array.from(document.querySelectorAll(CHANEL_NAME_SELECTOR))
      .filter(({ textContent }) => blockList.includes(textContent.trim()))
      .map((node) => node.closest(VIDEO_ITEM_SELECTOR))
      .forEach((node) => node.classList.add(BANNED_VIDEO_CLASS));
  }

  suspendBlock() {
    Array.from(document.querySelectorAll(BANNED_VIDEO_SELECTOR))
      .forEach((node) => node.classList.remove(BANNED_VIDEO_CLASS));
  }

  addBlockButtons() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(BlockVideoComponent);

    this.blockButtons = Array.from(document.querySelectorAll(CHANEL_NAME_SELECTOR))
      .map((node) => {
        const componentRef = factory.create(this.injector);

        componentRef.instance.chanelName = node.textContent.trim();
        componentRef.changeDetectorRef.detectChanges();
        node.prepend(componentRef.location.nativeElement);

        return componentRef;
      });
  }

  removeBlockButtons() {
    this.blockButtons.forEach((componentRef) => {
      (componentRef.location.nativeElement as Element).remove();
      componentRef.destroy();
    });

    this.blockButtons = [];
  }
}
