import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DownloaderService } from '../core/downloader/downloader.service';
import { DownloadsModel, DownloadsState } from '../store/downloads/downloads.state';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'downloader-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent implements OnInit, OnDestroy {
  @Input() rootUrl: string;
  @Select(DownloadsState) downloads$: Observable<DownloadsModel>;
  item$: Observable<boolean>;
  private rootSub = new Subscription();

  constructor(
    private downloader: DownloaderService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.item$ = this.downloads$.pipe(map(({ [this.rootUrl]: item }) => item));
    this.rootSub.add(this.item$.subscribe(() => {
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
