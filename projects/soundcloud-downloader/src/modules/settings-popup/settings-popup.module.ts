import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsPopupComponent } from './settings-popup.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [SettingsPopupComponent],
  entryComponents: [SettingsPopupComponent],
  imports: [CommonModule, MatDialogModule, MatCheckboxModule, FontAwesomeModule, MatTooltipModule],
})
export class SettingsPopupModule {
}
