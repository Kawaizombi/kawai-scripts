import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { QUALITY_CHOICES, SPEED_CHOICES, DEFAULT_QUALITY, DEFAULT_SPEED } from './preferences-popup.constants';

@Component({
  selector: 'yt-tweaks-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss'],
})
export class PreferencesPopupComponent {
  faTimes = faTimes;

  qualityChoices = QUALITY_CHOICES;
  defaultQuality = DEFAULT_QUALITY;
  speedChoices = SPEED_CHOICES;
  defaultSpeed = DEFAULT_SPEED;

  constructor(
    public dialogRef: MatDialogRef<PreferencesPopupComponent>,
  ) {
  }

  close() {
    this.dialogRef.close();
  }
}
