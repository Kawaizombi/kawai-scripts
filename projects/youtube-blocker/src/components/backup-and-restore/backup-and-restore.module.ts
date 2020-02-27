import { NgModule } from '@angular/core';
import { BackupAndRestoreComponent } from './backup-and-restore.component';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BackupAndRestoreComponent],
  exports: [BackupAndRestoreComponent],
  imports: [
    MatButtonModule,
    FontAwesomeModule,
    FormsModule,
    MatSnackBarModule,
    CommonModule,
  ],
})
export class BackupAndRestoreModule {

}
