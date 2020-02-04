import { NgModule } from '@angular/core';
import { DownloaderService } from './downloader.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  providers: [DownloaderService],
  imports: [MatSnackBarModule],
})
export class DownloaderModule {
}
