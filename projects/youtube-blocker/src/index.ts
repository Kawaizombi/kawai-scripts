import './polyfills';
import './styles/main.scss';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';
import combineCssSelectors from './utils/combine-css-rules';
import { environment } from './environments/environment';
import { migrate } from './utils/storage-migrate';
import waitSelector from '@kawai-scripts/wait-selector';

if(environment.production) enableProdMode();

const APP_ELEMENT = document.createElement('youtube-blocker');
const MOUNT_POINT = combineCssSelectors(
  '#yt-masthead-user',
  '#yt-masthead-signin',
  '#end',
);

async function mountApp() {
  await migrate();
  await waitSelector(MOUNT_POINT);
  document.querySelector(MOUNT_POINT).prepend(APP_ELEMENT);
  platformBrowserDynamic().bootstrapModule(AppModule);
}

mountApp();
