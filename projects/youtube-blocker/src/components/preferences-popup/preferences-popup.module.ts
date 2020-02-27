import { NgModule } from '@angular/core';
import { PreferencesPopupComponent } from './preferences-popup.component';
import {
  MatTabsModule,
  MatSlideToggleModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlockListModule } from '../block-list/block-list.modue';
import { AddFilterFormModule } from '../add-filter-form/add-filter-form.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackupAndRestoreModule } from '../backup-and-restore/backup-and-restore.module';

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
