import { Component, ElementRef, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import saveFile from '@kawai-scripts/save-file';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import readFile from './file-reader.promise';
import { AddFilterAction } from '../../store/block-list/block-list.actions';
import { BlockListState } from '../../store/block-list/block-list.state';

const TRY_ANOTHER_MSG = 'Try another?';
const RESTORE_ERROR_MSG = 'Error while restoring backup';

@Component({
  selector: 'backup-and-restore',
  templateUrl: './backup-and-restore.template.html',
  styleUrls: ['./backup-and-restore.styles.scss'],
})
export class BackupAndRestoreComponent {
  faDownload = faDownload;
  faUpload = faUpload;
  @Select(BlockListState.getFiltersCount) filterCount$: Observable<number>;
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
  ) {
  }

  private showErrorMsg() {
    this.snackBar
      .open(RESTORE_ERROR_MSG, TRY_ANOTHER_MSG, { duration: 3000 })
      .onAction()
      .subscribe(() => this.fileInput.nativeElement.click());
  }

  restoreBackup() {
    const file = this.fileInput.nativeElement.files[0];

    if(file) {
      from(readFile(file))
        .pipe(
          map((result) => JSON.parse(result)),
        )
        .subscribe(
          ({ blockList: { filters } }) => this.store.dispatch(new AddFilterAction(filters)),
          () => this.showErrorMsg()
        );
    }

    this.fileInput.nativeElement.value = '';
  }

  createBackup() {
    this.store.selectSnapshot(({ blockList }) => {
      const timestamp = formatDate(new Date(), 'y-MM-d', 'en');
      const backup = JSON.stringify({ blockList });
      const name = `youtube-blocker.backup.${ timestamp }.json`;
      saveFile(new Blob([backup], { type: 'text/plain' }), name);
    });
  }
}
