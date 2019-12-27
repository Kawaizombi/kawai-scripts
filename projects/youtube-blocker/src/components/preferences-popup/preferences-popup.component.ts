import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BlockerService } from '../blocker/blocker.service';
import { PreferencesState, PreferencesStateModel } from '../../store/preferences/preferences.state';
import { ToggleButtonInsert, ToggleSuspend } from '../../store/preferences/preferences.actions';

@Component({
  selector: 'preferences-popup',
  templateUrl: './preferences-popup.template.html',
  styleUrls: ['./preferences-popup.styles.scss'],
})
export class PreferencesPopupComponent {
  faTimes = faTimes;

  @Select(PreferencesState) preferences$: Observable<PreferencesStateModel>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PreferencesPopupComponent>,
    private blocker: BlockerService,
    private store: Store,
  ) {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  toggleBlock() {
    this.store.dispatch(new ToggleSuspend());
  }

  toggleButtons() {
    this.store.dispatch(new ToggleButtonInsert());
  }
}
