import './polyfills';
import './styles/main.scss';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './modules/app/app.module';

if(environment.production) enableProdMode();

(function mountApp() {
  const appElement = document.createElement('sc-downloader-root');

  document.body.append(appElement);

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((error) => console.error('Error has occurred while booting soundcloud-downloader', error));
})();
