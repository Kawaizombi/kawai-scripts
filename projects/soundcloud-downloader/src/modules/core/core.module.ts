import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpSnifferModule } from './http-sniffer/http-sniffer.module';
import { HttpInterceptorsModule } from './http-interceptors/http-interceptors.module';
import { ApiModule } from './api/api.module';
import { DownloaderModule } from './downloader/downloader.module';

@NgModule({
  imports: [
    CommonModule,
    HttpSnifferModule,
    HttpInterceptorsModule,
    ApiModule,
    DownloaderModule,
  ],
})
export class CoreModule {
}
