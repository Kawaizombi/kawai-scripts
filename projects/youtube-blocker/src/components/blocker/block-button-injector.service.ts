import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { CHANNEL_NAME_SELECTOR, VIDEO_ITEM_SELECTOR, WHITE_LISTED_CHANNELS } from './blocker.constants';
import { BlockVideoComponent } from '../block-video/block-video.component';


@Injectable()
export class BlockButtonInjectorService {
  private blockButtons: ComponentRef<BlockVideoComponent>[] = [];
  private factory: ComponentFactory<BlockVideoComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    this.factory = this.componentFactoryResolver.resolveComponentFactory(BlockVideoComponent);
  }

  attachButton(node: Element) {
    const componentRef = this.factory.create(this.injector);

    componentRef.instance.chanelName = node.textContent.trim();
    componentRef.changeDetectorRef.detectChanges();
    node.prepend(componentRef.location.nativeElement);

    return componentRef;
  }

  attachButtons(context: HTMLElement = document.body) {
    const addedButtons = Array.from(context.querySelectorAll(VIDEO_ITEM_SELECTOR))
      .filter((node) => !node.querySelector('block-video'))
      .map((node) => node.querySelector(CHANNEL_NAME_SELECTOR))
      .filter(({ textContent }: HTMLElement) => !WHITE_LISTED_CHANNELS.includes(textContent))
      .map((node) => this.attachButton(node));

    this.blockButtons = [...this.blockButtons, ...addedButtons];
  }

  private destroyButton(ref: ComponentRef<BlockVideoComponent>) {
    ref.location.nativeElement.remove();
    ref.destroy();
    this.blockButtons.splice(this.blockButtons.indexOf(ref), 1);
  }

  removeButtons() {
    this.blockButtons.forEach((ref) => this.destroyButton(ref));
  }

  removeButtonsFromNode(node: HTMLElement) {
    Array.from(node.querySelectorAll(this.factory.selector))
      .map((node) => this.blockButtons.find((ref) => ref.location.nativeElement === node))
      .forEach((ref) => this.destroyButton(ref));
  }
}
