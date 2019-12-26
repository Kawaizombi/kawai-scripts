import './polyfills';
import './styles/main.scss';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';

if(process.env.NODE_ENV === 'production') enableProdMode();

const MOUNT_POINTS = ['#yt-masthead-user', '#end'];

function getMountPoint() {
  return MOUNT_POINTS
    .map((point) => document.querySelector(point))
    .filter(Boolean)[0];
}

getMountPoint().prepend(document.createElement('youtube-blocker'));

platformBrowserDynamic().bootstrapModule(AppModule);
