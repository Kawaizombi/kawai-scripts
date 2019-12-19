import { finalize } from 'rxjs/operators';
import archive from '@kawai-scripts/archive';
import saveFile from '@kawai-scripts/save-file';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Downloader } from '../downloader/downloader.service';

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
    private readonly cd: ChangeDetectorRef,
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

    this.downloader.download()
      .pipe(
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

