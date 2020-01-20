import './polyfills';
import './styles/main.scss';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';
import combineCssSelectors from './utils/combine-css-rules';

if(process.env.NODE_ENV === 'production') enableProdMode();

const APP_ELEMENT = document.createElement('youtube-blocker');
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
  document.querySelector(MOUNT_POINT).prepend(APP_ELEMENT);
  platformBrowserDynamic().bootstrapModule(AppModule);
}

mountApp();
