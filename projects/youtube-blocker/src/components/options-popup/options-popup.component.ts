import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Select, Store } from '@ngxs/store';
import { BlockListState } from '../../store/block-list/block-list.state';
import { Observable } from 'rxjs';
import { AddFilterAction, RemoveFilterAction } from '../../store/block-list/block-list.actions';
import { faDownload, faPlusCircle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BlockerService } from '../blocker/blocker.service';
import { PreferencesState, PreferencesStateModel } from '../../store/preferences/preferences.state';
import { ToggleButtonInsert, ToggleSuspend } from '../../store/preferences/preferences.actions';
import saveFile from '@kawai-scripts/save-file';
import { formatDate } from '@angular/common';

@Component({
  selector: 'options-popup',
  templateUrl: './options-popup.template.html',
  styleUrls: ['./options-popup.styles.scss'],
})
export class OptionsPopupComponent {
  faTimes = faTimes;
  faPlusCircle = faPlusCircle;
  faTimesCircle = faTimesCircle;
  faDownload = faDownload;
  searchTerm: string;
  newFilter: string;

  @Select(PreferencesState) preferences$: Observable<PreferencesStateModel>;
  @Select(BlockListState.getFilters) filters$: Observable<string[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<OptionsPopupComponent>,
    private blocker: BlockerService,
    private store: Store,
  ) {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  deleteFilter(filter: string) {
    this.store.dispatch(new RemoveFilterAction(filter));
  }

  addFilter() {
    this.store.dispatch(new AddFilterAction(this.newFilter));
    this.newFilter = '';
  }

  toggleBlock() {
    this.store.dispatch(new ToggleSuspend());
  }

  toggleButtons() {
    this.store.dispatch(new ToggleButtonInsert());
  }

  createBackup() {
    const snapshot = this.store.snapshot();
    const str = JSON.stringify(snapshot);
    const name = `youtube-blocker.backup.${formatDate(new Date(), 'y-MM-d', 'en')}`;
    saveFile(new Blob([str], { type: 'text/plain' }), name);
  }
}
