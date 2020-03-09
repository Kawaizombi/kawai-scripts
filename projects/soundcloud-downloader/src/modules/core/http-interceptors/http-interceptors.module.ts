import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientIdInterceptor } from './client-id.interceptor';
import { AppVersionInterceptor } from './app-version.interceptor';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ClientIdInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppVersionInterceptor, multi: true },
  ],
})
export class HttpInterceptorsModule {
}
