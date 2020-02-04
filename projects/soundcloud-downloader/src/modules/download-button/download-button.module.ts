import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadButtonComponent } from './download-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [DownloadButtonComponent],
  entryComponents: [DownloadButtonComponent],
})
export class DownloadButtonModule {
}
