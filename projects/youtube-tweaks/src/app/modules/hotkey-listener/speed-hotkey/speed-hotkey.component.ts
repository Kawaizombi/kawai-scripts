import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { HotkeysModel, HotkeysState } from '../../store/hotkeys/hotkeys.state';

@Component({
  selector: 'yt-tweaks-speed-hotkey',
  templateUrl: './speed-hotkey.component.html',
  styleUrls: ['./speed-hotkey.component.scss']
})
export class SpeedHotkeyComponent implements OnInit, OnDestroy {
  private rootSub: Subscription;
  @Input() hotkeys: Subject<string>;
  @Select(HotkeysState) hotkeysState$: Observable<HotkeysModel>;

  ngOnInit() {
    this.rootSub = combineLatest([this.hotkeys, this.hotkeysState$])
      .subscribe(([hotkey, state]) => {
        console.log(hotkey, state);
      });
  }

  ngOnDestroy() {
    this.rootSub.unsubscribe()
  }
}
