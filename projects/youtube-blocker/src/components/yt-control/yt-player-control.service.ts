import { Injectable } from '@angular/core';
import { Player } from './@types';

const PLAYER_ELEMENT_SELECTOR = '#movie_player';

@Injectable({
  providedIn: 'root',
})
export class YtPlayerControlService {
  get player(): Player {
    return document.querySelector(PLAYER_ELEMENT_SELECTOR);
  }

  stop() {
    this.player.stopVideo();
  }
}
