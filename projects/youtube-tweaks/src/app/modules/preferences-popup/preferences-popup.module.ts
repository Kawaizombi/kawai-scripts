import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesPopupComponent } from './preferences-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PreferencesPopupComponent],
  entryComponents: [PreferencesPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class PreferencesPopupModule { }
