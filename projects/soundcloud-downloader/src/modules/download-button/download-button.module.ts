import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsPopupModule } from '../settings-popup/settings-popup.module';
import { DownloadButtonComponent } from './download-button.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FormsModule, MatDialogModule, SettingsPopupModule],
  declarations: [DownloadButtonComponent],
  entryComponents: [DownloadButtonComponent],
})
export class DownloadButtonModule {
}
