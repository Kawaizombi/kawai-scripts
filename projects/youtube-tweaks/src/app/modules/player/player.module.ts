import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from './player.service';
import { PlayerPatcherService } from './player-patcher.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    PlayerService,
    PlayerPatcherService,
  ],
})
export class PlayerModule { }
