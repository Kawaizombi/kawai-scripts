import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingsState } from '../store/settings/settings.state';
import { Observable } from 'rxjs';
import { ToggleTrackNumber } from '../store/settings/settings.actions';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'downloader-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.scss']
})
export class SettingsPopupComponent {
  faInfoCircle = faInfoCircle;
  @Select(SettingsState.addTrackNumberToFileName) addTrackNumberToFileName$: Observable<boolean>;

  constructor(private store: Store) { }

  toggleTrackNumbers(e: MatCheckboxChange) {
    this.store.dispatch(new ToggleTrackNumber(e.checked))
  }
}
