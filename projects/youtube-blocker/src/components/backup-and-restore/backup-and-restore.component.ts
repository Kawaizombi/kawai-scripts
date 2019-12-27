import { Component, ElementRef, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { Store } from '@ngxs/store';
import saveFile from '@kawai-scripts/save-file';
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import readFile from './file-reader.promise';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddFilterAction } from '../../store/block-list/block-list.actions';

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
  ) {
  }

  restoreBackup() {
    const file = this.fileInput.nativeElement.files[0];

    if(file) {
      from(readFile(file)).pipe(
        map((result: string) => JSON.parse(result)),
      ).subscribe(({ blockList: { filters } }) => this.store.dispatch(new AddFilterAction(filters)));
    }
  }

  createBackup() {
    this.store.selectSnapshot(({ blockList }) => {
      const str = JSON.stringify({ blockList });
      const name = `youtube-blocker.backup.${ formatDate(new Date(), 'y-MM-d', 'en') }.json`;
      saveFile(new Blob([str], { type: 'text/plain' }), name);
    });
  }
}
