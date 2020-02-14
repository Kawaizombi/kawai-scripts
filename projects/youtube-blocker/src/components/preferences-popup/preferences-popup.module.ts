import { NgModule } from '@angular/core';
import { PreferencesPopupComponent } from './preferences-popup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { BlockListModule } from '../block-list/block-list.modue';
import { AddFilterFormModule } from '../add-filter-form/add-filter-form.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BackupAndRestoreModule } from '../backup-and-restore/backup-and-restore.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PreferencesPopupComponent],
  entryComponents: [PreferencesPopupComponent],
  imports: [
    MatTabsModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    BlockListModule,
    AddFilterFormModule,
    FormsModule,
    CommonModule,
    BackupAndRestoreModule,
    MatDialogModule,
  ],
})
export class PreferencesPopupModule {

}
