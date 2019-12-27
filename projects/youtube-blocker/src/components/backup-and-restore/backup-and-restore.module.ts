import { NgModule } from '@angular/core';
import { BackupAndRestoreComponent } from './backup-and-restore.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BackupAndRestoreComponent],
  exports: [BackupAndRestoreComponent],
  imports: [
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class BackupAndRestoreModule {

}
