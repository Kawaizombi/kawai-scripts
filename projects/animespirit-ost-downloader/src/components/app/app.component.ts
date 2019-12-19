import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Downloader } from '../downloader/downloader.service';

@Component({
  selector: 'app',
  templateUrl: './app.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  trackList: any[];
  files: { [key: string]: ArrayBuffer } = {};

  constructor(
    private readonly downloader: Downloader,
    private readonly cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.trackList = this.downloader.getTrackList();
  }

  download() {
    this.downloader.download().subscribe(({name, file}) => {
      this.files = {...this.files, [name]: file};
      this.trackList[name] = Object.assign({}, this.trackList[name], {file});
      this.cd.detectChanges();
    });
  }
}

