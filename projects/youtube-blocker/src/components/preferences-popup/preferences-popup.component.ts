import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { PreferencesState, PreferencesStateModel } from '../../store/preferences/preferences.state';
import { ToggleButtonInsert, ToggleStopBlocked, ToggleSuspend } from '../../store/preferences/preferences.actions';

@Component({
  selector: 'preferences-popup',
  templateUrl: './preferences-popup.template.html',
  styleUrls: ['./preferences-popup.styles.scss'],
})
export class PreferencesPopupComponent {
  faTimes = faTimes;

  @Select(PreferencesState) preferences$: Observable<PreferencesStateModel>;

  constructor(
    private store: Store,
  ) {
  }

  toggleBlock() {
    this.store.dispatch(new ToggleSuspend());
  }

  toggleButtons() {
    this.store.dispatch(new ToggleButtonInsert());
  }

  toggleStopBlocked() {
    this.store.dispatch(new ToggleStopBlocked());
  }
}
