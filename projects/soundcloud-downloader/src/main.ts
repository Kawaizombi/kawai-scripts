import './polyfills';
import './styles/main.scss';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if(environment.production) enableProdMode();

function mountApp() {
  const MOUNT_POINT = 'header .header__right, .app__header header';
  const appElement = document.createElement('sc-downloader-root');

  document.querySelector(MOUNT_POINT).append(appElement);

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((error) => console.log('Error has occurred while booting soundcloud-downloader', error));
}

mountApp();
