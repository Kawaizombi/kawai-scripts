import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { QUALITY_CHOICES, SPEED_CHOICES } from './preferences-popup.constants';
import { Select, Store } from '@ngxs/store';
import { PreferencesModel, PreferencesState } from '../store/preferences/preferences.state';
import { Observable, Subscription } from 'rxjs';
import {
  SetDefaultQuality,
  SetDefaultSpeed,
  ToggleAutoStart,
  ToggleShortcuts,
} from '../store/preferences/preferences.actions';

@Component({
  selector: 'yt-tweaks-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss'],
})
export class PreferencesPopupComponent implements OnInit, OnDestroy {
  private rootSub = new Subscription();


  faTimes = faTimes;

  qualityChoices = QUALITY_CHOICES;
  speedChoices = SPEED_CHOICES;
  currentSpeed: string;
  currentQuality: string;

  @Select(PreferencesState) preferences$: Observable<PreferencesModel>;

  constructor(
    public dialogRef: MatDialogRef<PreferencesPopupComponent>,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.rootSub.add(
      this.preferences$
        .subscribe(({ defaultQuality, defaultSpeed }) => {
          this.currentQuality = this.qualityChoices.find(({ value }) => value === defaultQuality).label;
          this.currentSpeed = this.speedChoices.find(({ value }) => value === defaultSpeed).label;
        }),
    );
  }

  ngOnDestroy() {
    this.rootSub.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  toggleShortcuts() {
    this.store.dispatch(new ToggleShortcuts());
  }

  toggleAutoStart() {
    this.store.dispatch(new ToggleAutoStart());
  }

  setSpeed(speed: number) {
    this.store.dispatch(new SetDefaultSpeed(speed));
  }

  setQuality(quality: string) {
    this.store.dispatch(new SetDefaultQuality(quality));
  }
}
