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
import { ShortcutsPanelComponent } from './shortcuts-panel/shortcuts-panel.component';
import { MatListModule } from '@angular/material/list';
import { ShortcutKeysComponent } from './shortcuts-panel/shortcut-keys/shortcut-keys.component';
import { ShortcutEditComponent } from './shortcuts-panel/shortcut-edit/shortcut-edit.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [PreferencesPopupComponent, ShortcutsPanelComponent, ShortcutKeysComponent, ShortcutEditComponent],
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
    MatListModule,
    MatTooltipModule,
  ],
})
export class PreferencesPopupModule { }
