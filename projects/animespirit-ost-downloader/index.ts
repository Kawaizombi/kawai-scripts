import './polyfills';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./src/components/app/app.module";

const mountPoint = document.createElement('app');
document.querySelector('.accordion').prepend(mountPoint);

platformBrowserDynamic().bootstrapModule(AppModule);
