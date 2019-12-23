import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Provider } from './icons/@types';
import { createIcon, removeAllIcons } from './utils';

export const FAVICON_SIZE = new InjectionToken<number>('FAVICON_SIZE');

@Injectable()
export class FaviconService {
  constructor(
    @Inject(FAVICON_SIZE) private faviconSize,
  ) {
  }

  useIcon(provider: Provider) {
    const url = provider.getUrl({ size: this.faviconSize });
    const icon = createIcon(url);

    removeAllIcons();
    document.head.appendChild(icon);
  }
}
