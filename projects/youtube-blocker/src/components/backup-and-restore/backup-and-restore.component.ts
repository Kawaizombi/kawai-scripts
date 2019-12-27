import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { Store } from '@ngxs/store';
import saveFile from '@kawai-scripts/save-file';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'backup-and-restore',
  templateUrl: './backup-and-restore.template.html',
  styleUrls: ['./backup-and-restore.styles.scss'],
})
export class BackupAndRestoreComponent {
  faDownload = faDownload;

  constructor(
    private store: Store,
  ) {
  }

  createBackup() {
    const snapshot = this.store.snapshot();
    const str = JSON.stringify(snapshot);
    const name = `youtube-blocker.backup.${formatDate(new Date(), 'y-MM-d', 'en')}`;
    saveFile(new Blob([str], { type: 'text/plain' }), name);
  }
}
