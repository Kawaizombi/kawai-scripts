import { NgModule } from '@angular/core';
import { BackupAndRestoreComponent } from './backup-and-restore.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BackupAndRestoreComponent],
  exports: [BackupAndRestoreComponent],
  imports: [
    MatButtonModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class BackupAndRestoreModule {

}
