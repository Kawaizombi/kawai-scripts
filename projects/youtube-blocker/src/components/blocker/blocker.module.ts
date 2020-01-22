import { NgModule } from '@angular/core';
import { BlockerService } from './blocker.service';
import { BlockVideoModule } from '../block-video/block-video.module';
import { BlockButtonInjectorService } from './block-button-injector.service';

@NgModule({
  imports: [BlockVideoModule],
  providers: [BlockerService, BlockButtonInjectorService],
})
export class BlockerModule {

}
