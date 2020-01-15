import './polyfills';
import './styles/main.scss';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app/app.module';
import { enableProdMode } from '@angular/core';

if(process.env.NODE_ENV === 'production') enableProdMode();

function mountApp() {
  const MOUNT_POINT = 'header .header__right';
  const appElement = document.createElement('downloader-app');

  document.querySelector(MOUNT_POINT).append(appElement);

  platformBrowserDynamic().bootstrapModule(AppModule);
}

mountApp();
