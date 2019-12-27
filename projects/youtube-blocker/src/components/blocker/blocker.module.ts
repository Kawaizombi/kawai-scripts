import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { BlockerService } from './blocker.service';
import { BlockVideoComponent } from '../block-video/block-video.component';

@NgModule({
  declarations: [BlockVideoComponent],
  entryComponents: [BlockVideoComponent],
  providers: [BlockerService],
  imports: [
    FontAwesomeModule,
    MatButtonModule,
  ],
})
export class BlockerModule {

}
