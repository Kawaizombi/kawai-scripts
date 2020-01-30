import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  getPlayer(): any {
    return document.querySelector('#movie_player');
  }

  getAvailableQualityLevels(): string[] {
    return this.getPlayer().getAvailableQualityLevels();
  }

  getQuality() {
    return this.getPlayer().getPlaybackQuality();
  }

  getSpeed(): number {
    return this.getPlayer().getPlaybackRate();
  }

  setSpeed(speed: number) {
    const min = 0.25;
    const max = 2;
    const _speed = Math.min(Math.max(min, speed), max);

    this.getPlayer().setPlaybackRate(_speed);
  }

  setQuality(quality: string) {
    this.getPlayer().setPlaybackQualityRange(quality);
  }
}
