import { Component } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AddFilterAction } from '../../store/block-list/block-list.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'add-filter-form',
  templateUrl: './add-filter-form.template.html',
  styleUrls: ['./add-filter-form.styles.scss'],
})
export class AddFilterFormComponent {
  faPlusCircle = faPlusCircle;
  newFilter = '';

  constructor(
    private store: Store
  ) {
  }

  addFilter() {
    this.store.dispatch(new AddFilterAction(this.newFilter));
    this.newFilter = '';
  }
}
