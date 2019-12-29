import { NgModule } from '@angular/core';
import { BlockVideoComponent } from './block-video.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [FontAwesomeModule, MatButtonModule],
  entryComponents: [BlockVideoComponent],
  declarations: [BlockVideoComponent],
  exports: [BlockVideoComponent],
})
export class BlockVideoModule {

}
