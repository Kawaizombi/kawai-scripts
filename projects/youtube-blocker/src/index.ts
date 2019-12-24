import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';

if(process.env.NODE_ENV) enableProdMode();

document.querySelector('#end').prepend(document.createElement('youtube-blocker'));

platformBrowserDynamic().bootstrapModule(AppModule);
