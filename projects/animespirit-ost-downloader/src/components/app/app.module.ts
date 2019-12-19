import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Downloader } from '../downloader/downloader.service';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import GMBackend from '@kawai-scripts/gm-http-backend';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: Downloader, useClass: Downloader },
    GMBackend,
    { provide: HttpBackend, useExisting: GMBackend },
  ],
})
export class AppModule {
}
