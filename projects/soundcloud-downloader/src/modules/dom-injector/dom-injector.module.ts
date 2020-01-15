import { NgModule } from '@angular/core';
import { DomInjectorService } from './dom-injector.service';
import { DownloadButtonModule } from '../download-button/download-button.module';

@NgModule({
  imports: [DownloadButtonModule],
  providers: [DomInjectorService],
})
export class DomInjectorModule {
}
