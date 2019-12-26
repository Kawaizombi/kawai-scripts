import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Select, Store } from '@ngxs/store';
import { BlockListState } from '../../store/block-list/block-list.state';
import { Observable } from 'rxjs';
import { AddFilterAction, RemoveFilterAction } from '../../store/block-list/block-list.actions';

@Component({
  selector: 'options-popup',
  templateUrl: './options-popup.template.html',
  styleUrls: ['./options-popup.styles.scss'],
})
export class OptionsPopupComponent {
  searchTerm: string;
  newFilter: string;

  @Select(BlockListState.getFilters) filters$: Observable<string[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<OptionsPopupComponent>,
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
}
