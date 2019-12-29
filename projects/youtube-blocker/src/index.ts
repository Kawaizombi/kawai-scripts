import './polyfills';
import './styles/main.css';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';
import combineCssSelectors from './utils/combine-css-rules';

if(process.env.NODE_ENV === 'production') enableProdMode();

const MOUNT_POINT = combineCssSelectors(
  '#yt-masthead-user',
  '#yt-masthead-signin',
  '#end',
);

document.querySelector(MOUNT_POINT).prepend(document.createElement('youtube-blocker'));

platformBrowserDynamic().bootstrapModule(AppModule);
