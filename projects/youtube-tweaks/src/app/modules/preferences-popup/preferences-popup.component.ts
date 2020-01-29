import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'yt-tweaks-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss'],
})
export class PreferencesPopupComponent {
  faTimes = faTimes;

  qualityChoices = [
    {label: 'Auto'},
    {label: '240p'},
    {label: '360p'},
    {label: '480p'},
    {label: '720p'},
    {label: '1080p'},
    {label: 'Max'},
  ];
  defaultQuality = this.qualityChoices[0];

  constructor(
    public dialogRef: MatDialogRef<PreferencesPopupComponent>,
  ) {
  }

  close() {
    this.dialogRef.close();
  }
}
