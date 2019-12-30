import { Component, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Store } from '@ngxs/store';
import { AddFilterAction } from '../../store/block-list/block-list.actions';

@Component({
  selector: 'block-video',
  templateUrl: './block-video.template.html',
  styleUrls: ['./block-video.styles.scss'],
})
export class BlockVideoComponent {
  faTimesCircle = faTimesCircle;
  @Input() chanelName: string;

  constructor(
    private store: Store,
  ) {
  }

  blockChanel(event: MouseEvent) {
    this.store.dispatch(new AddFilterAction(this.chanelName));
    event.preventDefault();
    event.stopPropagation();
  }
}
