import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DownloaderService } from '../core/downloader/downloader.service';
import { DownloadsModel, DownloadsState } from '../store/downloads/downloads.state';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sc-downloader-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent implements OnInit, OnDestroy {
  faDownload = faDownload;

  @Input() rootUrl: string;
  @Input() size: 'small' | 'medium' = 'medium';
  @Select(DownloadsState) downloads$: Observable<DownloadsModel>;
  private rootSub = new Subscription();
  inProgress = false;

  constructor(
    private downloader: DownloaderService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    const item$ = this.downloads$.pipe(map(({ [this.rootUrl]: item }) => item));

    this.rootSub.add(item$.subscribe((inProgress) => {
      this.inProgress = inProgress;

      setTimeout(() => this.cd.detectChanges());
    }));
  }

  ngOnDestroy() {
    this.rootSub.unsubscribe();
  }

  download() {
    this.downloader.download(this.rootUrl);
  }
}
