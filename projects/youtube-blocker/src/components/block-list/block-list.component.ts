import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BlockListState } from '../../store/block-list/block-list.state';
import { RemoveFilterAction } from '../../store/block-list/block-list.actions';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

@Component({
  selector: 'block-list',
  templateUrl: './block-list.template.html',
  styleUrls: ['./block-list.styles.scss'],
})
export class BlockListComponent {
  @Select(BlockListState.getFilters) filters$: Observable<string[]>;
  searchTerm = '';
  faTimesCircle = faTimesCircle;

  constructor(
    private store: Store,
  ) {
  }

  deleteFilter(filter: string) {
    this.store.dispatch(new RemoveFilterAction(filter));
  }
}
