import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesPopupComponent } from './preferences-popup.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PreferencesPopupComponent],
  entryComponents: [PreferencesPopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
})
export class PreferencesPopupModule { }
