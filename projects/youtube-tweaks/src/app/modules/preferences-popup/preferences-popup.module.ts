import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesPopupComponent } from './preferences-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PreferencesPopupComponent],
  entryComponents: [PreferencesPopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class PreferencesPopupModule { }
