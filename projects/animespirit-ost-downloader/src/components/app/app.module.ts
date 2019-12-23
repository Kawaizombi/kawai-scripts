import { NgModule } from '@angular/core';
import GMBackend from '@kawai-scripts/gm-http-backend';
import { BrowserModule } from '@angular/platform-browser';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { Downloader } from '../downloader/downloader.service';
import { AppComponent } from './app.component';
import { FaviconModule } from "@kawai-scripts/favicon-indicator";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FaviconModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: Downloader, useClass: Downloader },
    { provide: HttpBackend, useClass: GMBackend },
  ],
})
export class AppModule {
}
