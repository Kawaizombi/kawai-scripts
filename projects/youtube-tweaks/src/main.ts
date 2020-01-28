import './styles.scss';
import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import combineCssSelectors from '../../youtube-blocker/src/utils/combine-css-rules';

if (environment.production) {
  enableProdMode();
}

const ROOT_ELEMENT = document.createElement('yt-tweaks-root');
const MOUNT_POINT = combineCssSelectors(
  '#yt-masthead-user',
  '#yt-masthead-signin',
  '#end',
);

async function waitSelector(selector: string) {
  while(document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
}

async function mountApp() {
  await waitSelector(MOUNT_POINT);
  document.querySelector(MOUNT_POINT).prepend(ROOT_ELEMENT);
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

mountApp();
