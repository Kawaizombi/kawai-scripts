import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'yt-tweaks-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss'],
})
export class PreferencesPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PreferencesPopupComponent>,
    private cd: ChangeDetectorRef,
    private overlayContainer: OverlayContainer,
  ) {
  }

  close() {
    this.dialogRef.close();
    console.log(this.dialogRef);

    // HACK: https://github.com/angular/components/issues/17899
    if(this.overlayContainer['_containerElement']) {
      this.overlayContainer['_containerElement'].remove();
    }
    this.overlayContainer['_containerElement'] = undefined;
  }
}
