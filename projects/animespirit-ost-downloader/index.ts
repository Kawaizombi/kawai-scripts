import './polyfills';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./src/components/app/app.module";
import { enableProdMode } from '@angular/core';

if (process.env.NODE_ENV === 'production') enableProdMode();

const mountPoint = document.createElement('app');
document.querySelector('.accordion').prepend(mountPoint);

platformBrowserDynamic().bootstrapModule(AppModule);
