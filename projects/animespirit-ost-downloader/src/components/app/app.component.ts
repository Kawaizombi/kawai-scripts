import { finalize, tap } from 'rxjs/operators';
import archive from '@kawai-scripts/archive';
import saveFile from '@kawai-scripts/save-file';
import { Component, OnInit } from '@angular/core';
import { Downloader } from '../downloader/downloader.service';
import { FaviconService, ProgressIcon } from "@kawai-scripts/favicon-indicator";

@Component({
  selector: 'app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.style.scss'],
})
export class AppComponent implements OnInit {
  trackList: any[];
  files: { [key: string]: ArrayBuffer } = {};
  inProgress = false;
  status = '';

  constructor(
    private readonly downloader: Downloader,
    private readonly favicon: FaviconService,
  ) {
  }

  ngOnInit() {
    this.trackList = this.downloader.getTrackList();
  }

  createArchive() {
    this.status = 'Archiving';

    return archive(this.trackList.map((item) => ({...item, file: this.files[item.name]})));
  }

  download() {
    this.inProgress = true;
    this.status = 'Downloading';
    this.favicon.useIcon(new ProgressIcon());

    this.downloader.download()
      .pipe(
        tap(() => {
          const percentage = 100 / this.trackList.length * Object.keys(this.files).length;

          this.favicon.useIcon(new ProgressIcon().setPercentage(percentage));
        }),
        finalize(async () => {
          const zip = await this.createArchive();
          saveFile(zip, this.downloader.getAlbumName());

          this.inProgress = false;
        })
      )
      .subscribe(({name, file}) => {
        this.files = {...this.files, [name]: file};
        this.trackList[name] = Object.assign({}, this.trackList[name], {file});
      });
  }
}

