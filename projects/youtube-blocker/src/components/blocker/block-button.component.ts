import { Component, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { AddFilterAction } from '../../store/block-list/block-list.actions';

@Component({
  selector: 'block-button',
  templateUrl: './block-button.template.html',
  styleUrls: ['./block-button.styles.scss'],
})
export class BlockButtonComponent {
  faTimesCircle = faTimesCircle;
  @Input() chanelName: string;

  constructor(
    private store: Store,
  ) {
  }

  blockChanel() {
    this.store.dispatch(new AddFilterAction(this.chanelName));
  }
}
