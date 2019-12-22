import { NgModule } from '@angular/core';
import { FAVICON_SIZE, FaviconService } from './favicon.service';

@NgModule({
  providers: [
    FaviconService,
    { provide: FAVICON_SIZE, useValue: 256 },
  ],
})
export class FaviconModule {

}
