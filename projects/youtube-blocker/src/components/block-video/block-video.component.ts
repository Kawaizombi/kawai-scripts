import { Component, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { Store } from '@ngxs/store';
import { AddFilterAction, RemoveFilterAction } from '../../store/block-list/block-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
  ) {
  }

  blockChanel(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.store.dispatch(new AddFilterAction(this.chanelName));

    this.snackBar
      .open(`Blocked ${ this.chanelName }`, 'Cancel?', {
        duration: 3000,
        horizontalPosition: 'end',
      })
      .onAction()
      .subscribe(() => this.store.dispatch(new RemoveFilterAction(this.chanelName)));
  }
}
