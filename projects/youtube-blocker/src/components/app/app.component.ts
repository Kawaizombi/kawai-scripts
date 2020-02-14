import { Component, OnInit } from '@angular/core';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { BlockerService, isInBlockList } from '../blocker/blocker.service';
import { Select } from '@ngxs/store';
import { BlockListState } from '../../store/block-list/block-list.state';
import { Observable, Subscription } from 'rxjs';
import { PreferencesState, PreferencesStateModel } from '../../store/preferences/preferences.state';
import { BlockButtonInjectorService } from '../blocker/block-button-injector.service';
import createMutationObserver from '../../utils/mutation-observer.observable';
import { OBSERVER_CONFIG, OBSERVER_ELEMENT_SELECTOR } from './app.constants';
import { first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import autobind from 'autobind-decorator';
import { PLAYER_ELEMENT_SELECTOR, YtPlayerControlService } from '../yt-control/yt-player-control.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import waitSelector from '@kawai-scripts/wait-selector';

const NAVIGATE_EVENT = document.querySelector('ytd-app') ? 'yt-navigate-finish' : 'spfdone';
const VIDEO_WAS_STOPPED_MSG = 'This video was stopped by youtube blocker because it matches block list!';

@Component({
  selector: 'youtube-blocker',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  private blockerSubscription = new Subscription();
  private injectorSubscription = new Subscription();

  private filters: string[] = [];

  @Select(BlockListState.getFilters) filters$: Observable<string[]>;
  @Select(PreferencesState) preferences$: Observable<PreferencesStateModel>;

  private mutations$ = createMutationObserver(document.querySelector(OBSERVER_ELEMENT_SELECTOR), OBSERVER_CONFIG);

  private addMutations$ = this.mutations$
    .pipe(
      map(({ addedNodes }) => Array.from(addedNodes)),
      map((nodes) => nodes.filter((node) => node instanceof HTMLElement)),
    );

  private removeMutations$ = this.mutations$
    .pipe(
      map(({ removedNodes }) => Array.from(removedNodes)),
      map((nodes) => nodes.filter((node) => node instanceof HTMLElement)),
    );

  constructor(
    private dialog: MatDialog,
    private blockerService: BlockerService,
    private blockButtonInjectorService: BlockButtonInjectorService,
    private playerControlService: YtPlayerControlService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.preferences$
      .subscribe(({ insertButtons, suspend, stopBlocked }) => {
        if(suspend) {
          this.blockerSubscription.unsubscribe();
          this.blockerService.suspendBlock();
          this.injectorSubscription.unsubscribe();
          this.blockButtonInjectorService.removeButtons();
          window.removeEventListener(NAVIGATE_EVENT, this.handleRedirect);
        } else {
          this.startBlocking();

          if(insertButtons) {
            this.startInjecting();
          }

          if(stopBlocked) {
            window.addEventListener(NAVIGATE_EVENT, this.handleRedirect);
          }
        }
      });

    this.preferences$
      .pipe(first())
      .subscribe(async ({ suspend, stopBlocked }) => {
        await waitSelector(PLAYER_ELEMENT_SELECTOR);
        if(!suspend && stopBlocked) this.handleRedirect();
      });
  }

  startInjecting() {
    this.blockButtonInjectorService.attachButtons();

    this.injectorSubscription.add(
      this.addMutations$.subscribe((nodes: HTMLElement[]) => {
        nodes.forEach((node) => this.blockButtonInjectorService.attachButtons(node));
      }),
    );

    this.injectorSubscription.add(
      this.removeMutations$.subscribe((nodes: HTMLElement[]) => {
        nodes.forEach((node) => this.blockButtonInjectorService.removeButtonsFromNode(node));
      }),
    );
  }

  @autobind
  handleRedirect() {
    const { author } = this.playerControlService.player.getVideoData();
    if(author && isInBlockList(author, this.filters)) {
      this.playerControlService.stop();

      this.snackBar.open(VIDEO_WAS_STOPPED_MSG, null, {
        duration: 5000,
        horizontalPosition: 'end',
      });
    }
  }

  startBlocking() {
    this.blockerSubscription.add(
      this.filters$.subscribe((filters) => {
        if(filters.length < this.filters.length) {
          this.blockerService.suspendBlock();
        }

        this.filters = filters;
        this.blockerService.applyBlock(this.filters);
      }),
    );

    this.blockerSubscription.add(
      this.addMutations$.subscribe((nodes: HTMLElement[]) => {
        nodes.forEach((node) => this.blockerService.applyBlock(this.filters, node));
      }),
    );
  }

  openOptionsPopup(event: MouseEvent) {
    event.stopPropagation();

    this.dialog.open(PreferencesPopupComponent, {
      minWidth: 640,
      panelClass: 'dialog-popup',
    });
  }
}
