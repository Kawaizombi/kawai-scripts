import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ShortcutsModel, ShortcutsState } from '../../store/shortcuts/shortcuts.state';
import { Observable } from 'rxjs';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';

type Mapping = {
  [key in keyof ShortcutsModel]: string;
}

@Component({
  selector: 'yt-tweaks-shortcuts-panel',
  templateUrl: './shortcuts-panel.component.html',
  styleUrls: ['./shortcuts-panel.component.scss']
})
export class ShortcutsPanelComponent {
  faPen = faPen;

  editing = null;

  mapping: Mapping = {
    SPEED_UP: 'Speed up',
    SPEED_DOWN: 'Speed down',
    QUALITY_UP: 'Quality up',
    QUALITY_DOWN: 'Quality down',
  };

  @Select(ShortcutsState) shortcuts$: Observable<ShortcutsModel>;

  edit(key: any) {
    this.editing = key;
  }

  editDone(shortcut?: string) {
    this.editing = null;
    console.log(shortcut);
  }
}
