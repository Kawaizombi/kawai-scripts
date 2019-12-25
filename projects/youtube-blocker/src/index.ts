import './polyfills';
import '@angular/material/prebuilt-themes/indigo-pink.css'
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';

if(process.env.NODE_ENV === 'production') enableProdMode();

document.querySelector('#yt-masthead-user').prepend(document.createElement('youtube-blocker'));

platformBrowserDynamic().bootstrapModule(AppModule);
