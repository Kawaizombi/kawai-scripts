import { Component, ElementRef, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { Store } from '@ngxs/store';
import saveFile from '@kawai-scripts/save-file';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import readFile from './file-reader.promise';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddFilterAction } from '../../store/block-list/block-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RESTORE_ERROR_MSG } from './backup-and-restore.constants';

@Component({
  selector: 'backup-and-restore',
  templateUrl: './backup-and-restore.template.html',
  styleUrls: ['./backup-and-restore.styles.scss'],
})
export class BackupAndRestoreComponent {
  faDownload = faDownload;
  faUpload = faUpload;
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
  ) {
  }

  restoreBackup() {
    const file = this.fileInput.nativeElement.files[0];

    if(file) {
      from(readFile(file))
        .pipe(
          map((result) => JSON.parse(result)),
        )
        .subscribe(({ blockList: { filters } }) => {
          this.store.dispatch(new AddFilterAction(filters));
        }, () => {
          this.snackBar
            .open(RESTORE_ERROR_MSG, 'Try another?', { duration: 3000 })
            .onAction()
            .subscribe(() => this.fileInput.nativeElement.click());
        });
    }

    this.fileInput.nativeElement.value = '';
  }

  createBackup() {
    this.store.selectSnapshot(({ blockList }) => {
      const str = JSON.stringify({ blockList });
      const name = `youtube-blocker.backup.${ formatDate(new Date(), 'y-MM-d', 'en') }.json`;
      saveFile(new Blob([str], { type: 'text/plain' }), name);
    });
  }
}
