import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientIdInterceptor } from './client-id.interceptor';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ClientIdInterceptor, multi: true },
  ],
})
export class HttpInterceptorsModule {
}
