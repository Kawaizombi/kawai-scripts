import { NgModule } from '@angular/core';
import { BlockVideoComponent } from './block-video.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatSnackBarModule,
    FontAwesomeModule,
  ],
  entryComponents: [BlockVideoComponent],
  declarations: [BlockVideoComponent],
  exports: [BlockVideoComponent],
})
export class BlockVideoModule {

}
