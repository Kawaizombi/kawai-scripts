import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class DownloaderService {
  constructor(
    private api: ApiService,
    private store: Store,
  ) {
  }

  download(rootUrl: string) {
    this.api.resolveByUrl(rootUrl);
  }
}
