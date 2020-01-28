import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'yt-tweaks-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss']
})
export class PreferencesPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PreferencesPopupComponent>,
  ) { }
}
