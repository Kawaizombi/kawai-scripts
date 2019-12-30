import { NgModule } from '@angular/core';
import { BlockVideoComponent } from './block-video.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
