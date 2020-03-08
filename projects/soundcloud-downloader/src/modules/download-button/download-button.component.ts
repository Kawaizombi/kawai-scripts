import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DownloaderService } from '../core/downloader/downloader.service';
import { DownloadsModel, DownloadsState } from '../store/downloads/downloads.state';
import { MOBILE_VERSION } from '../../constants';

@Component({
  selector: 'sc-downloader-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent implements OnInit, OnDestroy {
  faDownload = faDownload;

  @Input() rootUrl: string;
  @Select(DownloadsState) downloads$: Observable<DownloadsModel>;
  private rootSub = new Subscription();
  inProgress = false;

  constructor(
    private downloader: DownloaderService,
    private cd: ChangeDetectorRef,
    private el: ElementRef<HTMLUnknownElement>,
  ) {
  }

  ngOnInit() {
    if(MOBILE_VERSION) {
      this.el.nativeElement.classList.add('mobile');
    }

    const item$ = this.downloads$.pipe(map(({ [this.rootUrl]: item }) => item));

    this.rootSub.add(item$.subscribe((inProgress) => {
      this.inProgress = inProgress;

      setTimeout(() => this.cd.detectChanges());
    }));
  }

  ngOnDestroy() {
    this.rootSub.unsubscribe();
  }

  download(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.downloader.download(this.rootUrl);
  }
}
