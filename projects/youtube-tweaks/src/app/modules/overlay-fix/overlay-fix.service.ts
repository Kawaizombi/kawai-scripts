import { OverlayContainer } from '@angular/cdk/overlay';

export class OverlayFix extends OverlayContainer {
  protected _createContainer(): void {
    const containerClass = 'cdk-overlay-container';
    const previousContainers = this._document.getElementsByClassName(containerClass);

    // If there is already a container (can happen in a Microfrontend scenario with
    // multiple self-contained Angular apps on the same website), reuse that. But
    // clean it up because it could be created while transitioning from server
    // to client (Angular Universal) and may be stale. Remove any additional containers.
    for (let i = 0; i < previousContainers.length; i++) {
      while (i === 0 && previousContainers[i].firstChild) {
        previousContainers[i].removeChild(previousContainers[i].firstChild);
      }

      if (i > 0 && !!previousContainers[i].parentNode) {
        previousContainers[i].parentNode.removeChild(previousContainers[i]);
      }
    }

    if (previousContainers.length > 0) {
      this._containerElement = previousContainers[0] as HTMLElement;
      return;
    }

    const container = this._document.createElement('div');
    container.classList.add(containerClass);
    this._document.body.appendChild(container);
    this._containerElement = container;
  }
}
