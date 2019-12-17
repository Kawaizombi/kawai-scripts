import { Component } from "@angular/core";
import { Downloader } from '../downloader/downloader.service';

@Component({
  selector: 'app',
  templateUrl: './app.template.html'
})
export class AppComponent {
  constructor(
    private readonly downloader: Downloader
  ) {
  }

  download() {
    this.downloader.download();
  }
}

