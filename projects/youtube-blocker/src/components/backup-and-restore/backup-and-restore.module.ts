import { NgModule } from '@angular/core';
import { BackupAndRestoreComponent } from './backup-and-restore.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
