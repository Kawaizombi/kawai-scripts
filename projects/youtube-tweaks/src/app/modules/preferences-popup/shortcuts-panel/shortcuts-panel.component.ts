import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ShortcutsModel, ShortcutsState } from '../../store/shortcuts/shortcuts.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'yt-tweaks-shortcuts-panel',
  templateUrl: './shortcuts-panel.component.html',
  styleUrls: ['./shortcuts-panel.component.scss']
})
export class ShortcutsPanelComponent {
  @Select(ShortcutsState) shortcuts$: Observable<ShortcutsModel>;
}
